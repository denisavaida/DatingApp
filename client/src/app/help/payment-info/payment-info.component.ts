import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/_services/delivery.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit{
  delOptions: any = [];
  constructor(private deliveryService:DeliveryService){
    this.delOptions = this.deliveryService.getDeliveryOptions();
  }
  ngOnInit(): void {
    
  }
}
