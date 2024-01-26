import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/_services/delivery.service';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {
  delOptions: any;
constructor(private deliveryService:DeliveryService){
  this.delOptions = this.deliveryService.getDeliveryOptions();
}
  ngOnInit(): void {
  
  }
}
