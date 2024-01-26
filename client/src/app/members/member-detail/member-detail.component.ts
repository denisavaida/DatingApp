import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { MemberDto } from 'src/app/_models/memberDto';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{

  user: User | null= {
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
  };
  currentUser:  User | null = null; 
  constructor(private accountService: AccountService, private route: ActivatedRoute, private bcService: BreadcrumbService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> {this.user = user;
      
      console.log(this.currentUser);}
      
    })

  }
  ngOnInit(): void {
  this.loadUser();
  }
  
  loadUser(){
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.accountService.getUserByName(username).subscribe({
      next: user => {
        this.user = user;
        this.bcService.set('@memberDetail','Details - ' + this.user.userName );
        console.log(this.user);
      }
    })
  }

  clickEvent(event:any){

  }
}
