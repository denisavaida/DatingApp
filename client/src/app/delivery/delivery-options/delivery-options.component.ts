import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { take } from 'rxjs';
import { Delivery } from 'src/app/_models/delivery';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { Summary } from 'src/app/_models/summary';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { DeliveryService } from 'src/app/_services/delivery.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['./delivery-options.component.css']
})
export class DeliveryOptionsComponent implements OnInit{
  baseUrl = environment.apiUrl;
  @Output() selectedDelivery = new EventEmitter<number>();
  cart: ShoppingCart[]= [];
  deliveryOptions : Delivery[] = [];
  currentUser:any;
  summary : Summary = {
    AppUserId: 0,
    total: 0,
    shoppingCartItems: []
  }
  courier: any = {}

  constructor(private http: HttpClient ,private cartService: CartService, private checkoutService:CheckoutService, private accountService: AccountService, private deliveryService:DeliveryService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    this.cart = this.accountService.getShoppingCart();
    this.deliveryOptions =  this.deliveryService.getDeliveryOptions();

    console.log(this.deliveryOptions);
  }
  
  ngOnInit(): void {
    this.summary.shoppingCartItems = this.cart;
    this.summary.AppUserId = this.currentUser.id;
    this.summary.shoppingCartItems.forEach(element => {
      this.summary.total = this.summary.total + element.subtotal;
    });
  }

  radioButtonChange(data: MatRadioChange){
    console.log(data.value);
    this.selectedDelivery.emit(data.value);
  }
}
