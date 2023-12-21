import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Voucher } from "../_models/voucher";

@Injectable({
    providedIn: 'root'
  })
export class VoucherService{
    voucher: any;
    baseUrl = environment.apiUrl;
    private currentVoucherSource = new BehaviorSubject<Voucher|null>(null);    

    constructor(private http:HttpClient, private toastr:ToastrService){

    }
    getVouchers(){
      return this.http.get<Voucher[]>(this.baseUrl + 'voucher');
    }
    getVouchersByUserId(userId: number){
      return this.http.get<Voucher[]>(this.baseUrl + 'voucher/'+ userId);
    }
    getOneVoucherByUserId(id: number){
      return this.http.get<Voucher>(this.baseUrl + 'voucher/'+ id);
    }
    addVoucher(model:Voucher){
        return this.http.post<Voucher>(this.baseUrl + 'voucher/add',model).pipe(
          map(voucher=>{
            if(voucher){
              localStorage.setItem('voucher',JSON.stringify(voucher));
              this.currentVoucherSource.next(voucher);
            }
            return voucher;
          })
        )
    }

    updateVoucher(model:Voucher){
      return this.http.put<Voucher>(this.baseUrl + 'voucher/update',model).pipe(
        map(v=>{
          if(v){
            localStorage.setItem('updatedVoucher',JSON.stringify(v));
            console.log("Voucher is: "+v);
          }
          return v;
        })
      )
    }
}