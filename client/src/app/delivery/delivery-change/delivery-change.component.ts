import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from 'src/app/_models/deliveryMethod';
import { DeliveryService } from 'src/app/_services/delivery.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-delivery-change',
  templateUrl: './delivery-change.component.html',
  styleUrls: ['./delivery-change.component.css']
})
export class DeliveryChangeComponent {
 model:Delivery ={
   companyUrl: '',
   description: '',
   duration: '',
   cost: 0,
   id: 0
 };
 baseUrl = environment.apiUrl;
 options: any;
 constructor(private router:Router, private http:HttpClient,private deliveryService:DeliveryService,private toastr:ToastrService){
  this.getDeliveryOptions();
 }

 getDeliveryOptions(){
  return this.http.get(this.baseUrl+'delivery').subscribe({
    next: response => {this.options = response,
    console.log(response)},
    error:error=> console.log(error),
    complete:()=>console.log('get delivery options request is completed!')
  });
}
 addDelivery(){
  this.deliveryService.addDelivery(this.model).subscribe({
    next:response=>{
      this.router.navigateByUrl('/products')
      this.toastr.success("Item added to delivery db options")
      console.log(response);
      this.cancel;
    },
    error:error=>{
      this.toastr.error(error.error)
      console.log(error)
    }
  })
 }

 updateDeliveryMethod(model:any){
  this.deliveryService.updateDelivery(model).subscribe();
 }
 deleteDeliveryMethod(model:any){
    this.deliveryService.deleteDelivery(model);
 }
 
 radioButtonChange(data: MatRadioChange){
  console.log(data.value);
}
 cancel(){
  this.router.navigateByUrl('/products');
 }
}
