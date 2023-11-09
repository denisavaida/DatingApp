import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from 'src/app/_models/card';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  model:any = { };
  @Output() fillCard = new EventEmitter<Card>();
  months:string[]=['01','02','03','04','05','06','07','08','09','10','11','12'];
  years:string[]=['2023','2024','2025','2026','2027','2028'];
  constructor(private checkoutService: CheckoutService){

  }
  pay(){
    this.fillCard.emit(this.model);
    this.checkoutService.setPaymentInfo(this.model);
  }

  mychange(val:any) {
    const self = this;
    let chIbn = val.split(' ').join('');
    if (chIbn.length > 0) {
      chIbn = chIbn.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    console.log(chIbn);
    this.model.number = chIbn;
  }
}
