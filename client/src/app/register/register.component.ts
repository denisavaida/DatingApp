import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {}

  constructor(private accountService : AccountService, private router: Router, private toastr: ToastrService){ }

  ngOnInit(): void {  
  }

  register(){
    this.model.role ="member";
    this.accountService.register(this.model).subscribe({
      next: response =>{
        this.router.navigateByUrl('/products')
        this.toastr.success("Succesfully registered !")
        console.log(response);
        this.cancel;
      },
      error : error =>{
        console.log(error)
      }
    })
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
