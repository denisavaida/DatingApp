import { Component, EventEmitter, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { Card } from 'src/app/_models/card';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  model:Card = {
    id: 0,
    number: '',
    expiryMonth: 0,
    expiryYear: 0,
    CVV: 0,
    name: ''
  };
  @Output() fillCard = new EventEmitter<Card>();
  months:string[]=['01','02','03','04','05','06','07','08','09','10','11','12'];
  years:string[]=['2023','2024','2025','2026','2027','2028'];
  displayNumber: any;
  submited : boolean = false;
  cardType : string = "";
  constructor(private checkoutService: CheckoutService){

  }
  addCard(){
    this.submited = true;
    const array=[];
    var code = this.model.number;
    for(let n = 0; n<code.length; n++){
      if(code[n] != " "){

        array.push(code[n]);
      }
    }
    code = array.join("") ;
    this.model.number = code;
    console.log(this.model.number);

    this.fillCard.emit(this.model);
    this.checkoutService.setPaymentInfo(this.model);
    this.displayNumber = this.setDisplayNumber(this.model.number);
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
  setDisplayNumber(code: string){

    const array=[];
    for(let n = 0; n<code.length; n++){
      if(n==0 && code[n] == "4"){
        this.cardType = "VISA";
      }else if(n==0 && code[n] == "5"){
        this.cardType ="MASTERCARD";
      }
      array.push(code[n]);
    }
    
    for(let i = 0; i<array.length-4; i++){
      if (array[i] != " " ){
        array[i] = "*";
      }
      
    }
    this.displayNumber = array.join("") ;
    // this.displayNumber = String.join(",",array);
    console.log(this.displayNumber );
    console.log(array);
    return this.displayNumber;
  }
}
