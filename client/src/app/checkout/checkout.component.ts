import { Component } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Delivery } from '../_models/delivery';
import { CheckoutService } from '../_services/checkout.service';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { ShoppingCart } from '../_models/shopping-cart';
import { Summary } from '../_models/summary';
import { Order } from '../_models/order';
import { DeliveryService } from '../_services/delivery.service';
import { DeliveryInfo } from '../_models/deliveryInfo';
import { Card } from '../_models/card';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  baseUrl = environment.apiUrl;
  currentUser:any={};
  dbCart:ShoppingCart[] = [];
  summary: Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: []
  }
  products: Product[]=[];
  delOption: Delivery = {
    companyUrl: '',
    description: '',
    duration: '',
    cost: 0,
    id: 0
  };
  delInfo:DeliveryInfo = {
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    adress: {
      street: '',
      number: 0,
      city: '',
      region: '',
      country: '',
      postcode: 0,
      userId: 0
    },
    additonalInfo: ''
  }
  paymentMethod: Card = {
    id: 0,
    number: 0,
    expiryMonth: 0,
    expiryYear: 0,
    CVV: 0,
    name: ''
  }
  order: Order={
    id: 0,
    summary: this.summary,
    deliveryMethod: this.delOption,
    deliveryInfo: this.delInfo,
    paymentMethod: this.paymentMethod,
    coupon: ''
  }
  constructor(private deliveryService: DeliveryService, private accountService:AccountService,private checkoutService:CheckoutService, private toastr: ToastrService, private router: Router){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    this.dbCart = this.accountService.getShoppingCart();
  }
  ngOnInit(): void {
    console.log(this.dbCart);
    this.dbCart.forEach(element => {
      this.summary.total = this.summary.total + element.subtotal;
      this.order.summary.shoppingCartItems.push(element);
    });
      console.log(this.summary.total);
      this.summary.AppUserId = this.currentUser.id;
      this.order.paymentMethod = this.paymentMethod;
      this.order.deliveryInfo = this.delInfo;
      this.order.deliveryMethod = this.delOption;
  }

  addDelivery(deliveryId: number) {
      this.deliveryService.getDeliveryOptionById(deliveryId).subscribe({
      next: response => {this.order.deliveryMethod = response
        this.delOption.cost = this.order.deliveryMethod.cost
      },
      error:error=> console.log(error),
      complete:()=>console.log('get delivery options request is completed!')
    });
  }
  addDeliveryInfo(delInfo:DeliveryInfo){
    this.delInfo = delInfo;
    this.order.deliveryInfo = this.delInfo;
    console.log(this.order.deliveryInfo);
    console.log(this.order);
  }
  addCard(card:Card){
    this.order.paymentMethod = card;
    console.log(this.order.paymentMethod);
  }
  changeIndex(tabgroup: MatTabGroup, number: number){
    tabgroup.selectedIndex = number;
  }
  // Pay(){
  //   this.checkoutService.pay(this.order);
  // }

  back(){
    this.router.navigateByUrl('/shoppingCart');
  }
}
