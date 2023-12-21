import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { Voucher } from 'src/app/_models/voucher';
import { AccountService } from 'src/app/_services/account.service';
import { VoucherService } from 'src/app/_services/voucher.service';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit{
  user: any;
  currentUser: User | null = null;
  // vouchers : Voucher[]= [];
  voucher: Voucher[] = [];
  constructor(private voucherService:VoucherService, private accountService:AccountService, private route: ActivatedRoute){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    
  }

  ngOnInit(): void {
    this.loadVouchers();
    // GET ALL THE VOUCHERS OF A CERTAIN USER !!!
  }
  
  loadVouchers(){
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.accountService.getUserByName(username).subscribe({
      next: user => {
        this.user = user; 
        this.voucherService.getVouchersByUserId(this.user.id).subscribe({
          next: voucher => {
            // if(this.user.id == voucher.AppUserId){
              this.voucher =  voucher;
              // this.vouchers.push(voucher);
              // console.log(this.vouchers);
            // }
            console.log(this.voucher);}
        });
      }
    })
    
  }

}
