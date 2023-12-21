import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { VoucherService } from 'src/app/_services/voucher.service';

@Component({
  selector: 'app-voucher-create',
  templateUrl: './voucher-create.component.html',
  styleUrls: ['./voucher-create.component.css']
})
export class VoucherCreateComponent {
  model:any={}
  constructor(private voucherService:VoucherService,private router:Router, private toastr:ToastrService, private accountService:AccountService){}

  generateVoucher(){
    console.log(this.model);
    this.model.available = true;
    // this.accountService.getUserByName(this.model.username).subscribe();
    this.voucherService.addVoucher(this.model).subscribe({
      next:(response: any)=>{
        this.router.navigateByUrl('/products')
        this.toastr.success("Voucher added !")
        console.log(response);
        // this.cancel;
      },
      error:(error: { error: any; })=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  
  }
}
