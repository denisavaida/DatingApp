import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Adress } from '../_models/adress';
import { CheckoutService } from '../_services/checkout.service';
@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})

export class AdressComponent {
  // model: any= {}
  @Input('userId') userId: any;
  // @Output() adressFilled = new EventEmitter<Adress>();
  // @Input() adressFrom :any ={};
 @Input('model') model:any={}
  // adressOutput: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService,private checkoutService:CheckoutService){

  }
  // addAdressRegister(){
  //   this.adressOutput ={
  //     street: this.model.street,
  //     number: this.model.number,
  //     city: this.model.city,
  //     region: this.model.region,
  //     country: this.model.country,
  //     userId: this.model.userId
  //   }
  //   this.accountService.addAdressRegister(this.adressOutput).subscribe({
  //     next:response=>{
  //       localStorage.setItem('adress',JSON.stringify(this.adressOutput))
  //       this.toastr.success("Item added to user details adress component")
  //       console.log(response);
  //       this.cancel;
  //     },
  //     error:error=>{
  //       this.toastr.error(error.error)
  //       console.log(error)
  //     }
  //   })
    
  //   console.log(this.adressOutput);
  //   console.log("Added to shopping cart ! ");
  // }

  // setAdress(){
  //   this.checkoutService.setAdress(this.model);
  //   this.adressFilled.emit(this.model);
  // }
  cancel(){}
 

}
