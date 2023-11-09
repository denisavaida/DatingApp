import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.css']
})
export class DeliveryEditComponent {
model:any = {};

constructor(private route:ActivatedRoute, private checkoutService:CheckoutService){
  this.loadDelivery();
}

loadDelivery(){
  var id = this.route.snapshot.paramMap.get('id');
  if(!id) return;
  this.checkoutService.getDeliveryOptionById(id).subscribe({
    next: opt => {
      this.model = opt;
    }
  })
}
  updateDelivery(){}
  cancel(){}
}
