import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User | null> = of(null);
  
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService){}

  ngOnInit() :  void{
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {this.router.navigateByUrl('/products')
      this.toastr.success("You are logged in ! ")}
    })
  }
  logout(){
    this.accountService.logout();
    this.toastr.show("You are now logged out !")
    this.router.navigateByUrl('/');
  }

}
