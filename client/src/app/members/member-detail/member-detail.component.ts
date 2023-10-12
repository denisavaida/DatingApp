import { Component } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {

  user: User | null = null;
  
  constructor(private accountService: AccountService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.user = user
    })
  }
}
