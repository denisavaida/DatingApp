import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Adress } from 'src/app/_models/adress';
import { DeliveryInfo } from 'src/app/_models/deliveryInfo';
import { AccountService } from 'src/app/_services/account.service';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { AdressComponent } from 'src/app/adress/adress.component';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent {
  @Output() deliveryInfo = new EventEmitter<DeliveryInfo>();
  // @ViewChild(AdressComponent)
  adress :Adress = {
    street: '',
    number: 0,
    city: '',
    region: '',
    country: '',
    postcode: 0,
    appUserId: 0
  }
  info:DeliveryInfo = {
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    adress: this.adress,
    additonalInfo: '',
    appUserId: 0,
    adressId: 0
  };
  currentUser:any;
  submited:boolean = false;
  constructor(private checkoutService: CheckoutService, private accountService: AccountService){
    this.checkoutService.setDeliveryInfo(this.info);
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> {
        this.currentUser = user
        if(this.currentUser){
          console.log(this.currentUser);
          this.accountService.getAdress(this.currentUser.id).subscribe({
            next: adress => {this.adress = adress
            console.log(this.adress)}
          })
        }
      }
    })
    
  }

  setDeliveryInfo(){
    // this.accountService.getAdress(this.currentUser.id).subscribe({
    //   next: adress => {this.info.adress = adress
    //   console.log(this.adress)}
    // })
    this.info.adress = this.adress;
    this.info.appUserId = this.currentUser.id;
    console.log(this.info);
    this.info.adress = this.adress;
    this.checkoutService.setDeliveryInfo(this.info);
    this.submited = true;
    this.deliveryInfo.emit(this.info);
  }
  fillAdress(){

  }
  // addAdress(adress:Adress){
  //   console.log(adress);
  //   this.info.adress = adress;
  //   console.log(this.info);
  // }
}
