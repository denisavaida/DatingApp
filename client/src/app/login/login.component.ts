import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() model: any = {};
  constructor(private accountService:AccountService, private toastr: ToastrService, private router: Router,private cartService: CartService){
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {this.router.navigateByUrl('/products')
      this.toastr.success("You are logged in ! ")},
      
      error : error =>{
        console.log(error)
      }
    })
    this.model.active = true;

  }
  cancel(){}
}
