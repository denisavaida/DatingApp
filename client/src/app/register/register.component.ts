import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdressComponent } from '../adress/adress.component';
import { ShoppingCart } from '../_models/shopping-cart';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  @ViewChild(AdressComponent)
  
  adress :any = {}
  model: any = {}

  constructor(private accountService : AccountService, private router: Router, private toastr: ToastrService){
     this.adress = accountService.loadAdress(this.adress);
   }

  ngOnInit(): void {  
  }

  register(){
    this.model.role ="member";
    this.model.adress = this.adress.model;
    
    if (this.model.password == this.model.confirm){
      this.accountService.register(this.model).subscribe({
        next: response =>{
          this.toastr.success("Succesfully registered !")
          this.router.navigateByUrl('/products')
          console.log(response);
          this.cancel;
        },
        error : error =>{
          console.log(error)
        }
      })
      console.log(this.model);
    }else{
      console.log("Passwords don't match !");
    }

  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
