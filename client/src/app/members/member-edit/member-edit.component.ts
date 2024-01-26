import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Adress } from 'src/app/_models/adress';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{  
  member: User = {
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
  currentUser: User | null = null;
  adress: any = {};
  confirm: any;
  constructor(private accountService: AccountService, private route:ActivatedRoute, private bcService:BreadcrumbService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    
  }
  ngOnInit():void{
    // this.accountService.getAdress(this.currentUser?.id).subscribe({next: response=>{this.adress = response; console.log(this.adress)}});

    this.loadMember();
  }

  loadMember(){
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.accountService.getUserByName(username).subscribe({
      next: member => {this.member = member;
        this.bcService.set('@memberEdit','Edit - '+this.member.firstName );
  }
      
    })
    return this.member;
  }

  updateUser(){

  }
  cancel(){}
} 
