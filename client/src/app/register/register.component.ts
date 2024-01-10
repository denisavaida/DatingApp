import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdressComponent } from '../adress/adress.component';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  @ViewChild(AdressComponent)
  
  adress :any = {}
  model: User = {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    orders: [],
    vouchers: [],
    adress: {
      street: '',
      number: 0,
      city: '',
      region: '',
      country: '',
      postcode: 0,
      appUserId: 0
    },
    dateOfBirth: new Date()
  }
  confirm:string="";

  constructor(private accountService : AccountService, private router: Router, private toastr: ToastrService){
     this.adress = accountService.loadAdress(this.adress);
   }

  ngOnInit(): void {  
  }

  register(){
    this.model.role ="member";
    this.model.adress = this.adress.model;
    
    if (this.model.password == this.confirm){
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
