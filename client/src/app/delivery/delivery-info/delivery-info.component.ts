import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DeliveryInfo } from 'src/app/_models/deliveryInfo';
import { CheckoutService } from 'src/app/_services/checkout.service';
import { AdressComponent } from 'src/app/adress/adress.component';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent {
  @Output() deliveryInfo = new EventEmitter<DeliveryInfo>();
  @ViewChild(AdressComponent)
  adress :any = {}
  info:DeliveryInfo = {
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    adress: this.adress.model,
    additonalInfo: '',
    appUserId: 0,
    adressId: 0
  };
  submited:boolean = false;
  constructor(private checkoutService: CheckoutService){
    this.checkoutService.setDeliveryInfo(this.info);
  }

  setDeliveryInfo(){
    this.info.adress = this.adress.model;
    this.info.adressId = this.adress.model.id;
    console.log(this.info);
    this.info.adress = this.adress.model;
    this.checkoutService.setDeliveryInfo(this.info);
    this.submited = true;
    this.deliveryInfo.emit(this.info);
  }
  
  // addAdress(adress:Adress){
  //   console.log(adress);
  //   this.info.adress = adress;
  //   console.log(this.info);
  // }
}
