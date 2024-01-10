import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Delivery } from '../_models/deliveryMethod';
import { CheckoutService } from '../_services/checkout.service';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { ShoppingCart } from '../_models/shopping-cart';
import { Summary } from '../_models/summary';
import { Order } from '../_models/order';
import { DeliveryService } from '../_services/delivery.service';
import { DeliveryInfo } from '../_models/deliveryInfo';
import { Card } from '../_models/card';
import { Voucher } from '../_models/voucher';
import { DeliveryInfoComponent } from '../delivery/delivery-info/delivery-info.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild(DeliveryInfoComponent)
  
  baseUrl = environment.apiUrl;
  currentUser:any={};
  dbCart:ShoppingCart[] = [];
  address:any={}
  voucher:Voucher={
    code: '',
    discount: 0,
    validity: new Date(),
    AppUserId: 0,
    available: true,
    id: 0
  }
  summary: Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: [],
    productCost: 0,
    voucherID: 0,
    discounted: 0
  }
  products: Product[]=[];
  delOption: Delivery = {
    companyUrl: '',
    description: '',
    duration: '',
    cost: 0,
    id: 0
  };
  delInfo:DeliveryInfo={
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    adress: this.address,
    additonalInfo: '',
    appUserId: 0,
    adressId: 0
  };
  paymentMethod: Card = {
    id: 0,
    number: '',
    expiryMonth: 0,
    expiryYear: 0,
    CVV: 0,
    name: ''
  }
  order: Order={
    id: 0,
    summary: this.summary,
    delivery: this.delOption,
    deliveryInfo: this.delInfo,
    paymentMethod: this.paymentMethod,
    appUserId: 0,
    date: new Date(),
    status: {
      id: 0,
      name: ''
    }
  }
  submited:boolean = false;
  currentTab: any = 0;
  selectedTabIndex:any;
  summaryDB:any;

  constructor(private deliveryService: DeliveryService, private accountService:AccountService,private checkoutService:CheckoutService, private toastr: ToastrService, private router: Router){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })

    // !!!!! GET SUMMARY FROM DB (WITH OR WITHOUT VOUCHER APPLIED)
     this.dbCart = this.accountService.getShoppingCart();
    // this.summaryDB = this.accountService.getSummary();
    // this.summaryDB = this.checkoutService.getSummaryByUserId(this.currentUser.id);
  }
  ngOnInit(): void {
    
    console.log(this.dbCart);
    this.dbCart.forEach(element => {
      this.summary.productCost = this.summary.productCost + element.subtotal;
      this.summary.total = this.summary.productCost + this.delOption.cost;
      this.order.summary.shoppingCartItems.push(element);
    });
      console.log(this.summary.total);
      this.summary.AppUserId = this.currentUser.id;
      this.order.paymentMethod = this.paymentMethod;
      this.order.deliveryInfo = this.delInfo;
      // this.order.deliveryInfo.adress.userId = this.currentUser.id;
      // this.order.deliveryInfo.appUserId = this.currentUser.id;
      // this.order.delivery = this.delOption;
      this.order.paymentMethod = this.paymentMethod;
      this.order.appUserId = this.currentUser.id;
  }
  loadSummmary(){
    
  }
  addDeliveryOption(deliveryId: number) {
      this.deliveryService.getDeliveryOptionById(deliveryId).subscribe({
      next: response => {this.order.delivery = response
        console.log(this.order.delivery);
        if(this.summary.productCost > 200){
          this.order.delivery.cost = 0
        }
        this.delOption.cost = this.order.delivery.cost;
        this.summary.total = this.summary.total + this.delOption.cost;
      },
      error:error=> console.log(error),
      complete:()=>console.log('get delivery options request is completed!')
    });
  }

  addDeliveryInfo(delInfo:DeliveryInfo){
    this.delInfo = delInfo;
    this.delInfo.appUserId = this.currentUser.id;
    this.order.deliveryInfo = this.checkoutService.getDeliveryInfo();
    console.log(this.order.deliveryInfo);
    console.log(this.order);
  }

  addCard(card:Card){
    card.number;
    this.order.paymentMethod = card;
    this.submited = true;
    console.log(this.order.paymentMethod);
  }

  changeIndex( number: number){
    // tabgroup.selectedIndex = number;
    this.selectedTabIndex = number;
    this.currentTab = number;
    if(this.currentTab == 1){
      this.order.deliveryInfo = this.delInfo;
    }
    
  }

  onTabChange() {
    this.selectedTabIndex = this.currentTab;
  }
  
  sendOrder(){
    console.log(this.order);
    this.order.appUserId = this.currentUser.id;
    this.order.status.name = "Confirmare comanda";
    this.checkoutService.sendOrder(this.order);
    this.router.navigateByUrl('/confirmation');
  }

  back(){
    this.router.navigateByUrl('/shoppingCart');
  }
}
