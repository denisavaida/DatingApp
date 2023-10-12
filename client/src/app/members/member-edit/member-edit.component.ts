import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{  
  member: User | null = null;
  user: User | null = null;

  constructor(private accountService: AccountService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.user = user
    })
  }
  ngOnInit():void{
    this.loadMember();

  }

  loadMember(){
    if(!this.user) return;
    this.accountService.getUser(this.user.username).subscribe({
      next: member => this.member = member
    })
  }
} 
