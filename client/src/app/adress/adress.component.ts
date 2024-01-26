import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Adress } from '../_models/adress';
import { CheckoutService } from '../_services/checkout.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})

export class AdressComponent implements OnInit {
  // model: any= {}
  modell:any;
  @Input('userId') userId: any;
  @Output() adressFilled = new EventEmitter<Adress>();
  // @Input() adressFrom :any ={};
 @Input('model') model:Adress={
   street: '',
   number: 0,
   city: '',
   region: '',
   country: '',
   postcode: 0,
   appUserId: 0
 }
  currentUser: any;

  constructor(private accountService: AccountService, private toastr: ToastrService,private checkoutService:CheckoutService){
    
  }
  ngOnInit(): void {

    this.loadAdress();
  }
  loadAdress(){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> {
        this.currentUser = user
        if(this.currentUser){
          console.log(this.currentUser);
          this.accountService.getAdress(this.currentUser.id).subscribe({
            next: adress => {this.model = adress
              this.adressFilled.emit(this.model)
            // console.log(this.adressFilled)
          }
          })
        }
      }
    })
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
