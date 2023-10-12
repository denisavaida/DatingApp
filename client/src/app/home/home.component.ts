import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  registerMode = false;
  users: any;

  constructor(private router: Router,private http: HttpClient, private accountService: AccountService){}

  ngOnInit(): void {this.accountService.getUsers();
  }
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('get users sRequest has completed')

    })
  }
  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  guestMode(){
    this.router.navigateByUrl('/products')
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
