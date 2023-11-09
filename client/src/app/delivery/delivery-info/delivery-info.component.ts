import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Adress } from 'src/app/_models/adress';
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
  };

  constructor(private checkoutService: CheckoutService){}

  setDeliveryInfo(){
    
    console.log(this.info);
    this.info.adress = this.adress.model;
    this.checkoutService.setDeliveryInfo(this.info);
    this.deliveryInfo.emit(this.info);
  }
  
  // addAdress(adress:Adress){
  //   console.log(adress);
  //   this.info.adress = adress;
  //   console.log(this.info);
  // }
}
