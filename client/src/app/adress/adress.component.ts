import { Component, Injectable, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})

export class AdressComponent {
  model: any= {}
  @Input('userId') userId: any;
  // @Input() adressFrom :any ={};
  adressOutput: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService ){

  }
  addAdressRegister(){
    this.adressOutput ={
      street: this.model.street,
      number: this.model.number,
      city: this.model.city,
      region: this.model.region,
      country: this.model.country,
      userId: this.model.userId
    }
    this.accountService.addAdressRegister(this.adressOutput).subscribe({
      next:response=>{
        localStorage.setItem('adress',JSON.stringify(this.adressOutput))
        this.toastr.success("Item added to user details adress component")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
    
    console.log(this.adressOutput);
    console.log("Added to shopping cart ! ");
  }
  cancel(){}
 

}
