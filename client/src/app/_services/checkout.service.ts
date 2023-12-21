import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Delivery } from "../_models/deliveryMethod";
import { AccountService } from "./account.service";
import { DeliveryInfo } from "../_models/deliveryInfo";
import { Adress } from "../_models/adress";
import { take } from "rxjs";
import { Order } from "../_models/order";
import { Card } from "../_models/card";
import { Summary } from "../_models/summary";

@Injectable({
    providedIn: 'root'
  })
  export class CheckoutService {

    baseUrl = environment.apiUrl;
    shoppingCart: any={}
    deliveryOptions:any = {}
    adress: Adress={
      street: "",
      number: 0,
      city: "",
      region: "",
      country: "",
      postcode: 0,
      appUserId: 0
    }
    delInfo:DeliveryInfo={
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      adress: this.adress,
      additonalInfo: "",
      appUserId: 0,
      adressId: 0
    }
    order:any={};
    currentUser:any;
    constructor(private http: HttpClient,private accountService: AccountService){ 
      this.accountService.currentUser$.pipe((take(1))).subscribe({
        next: user=> this.currentUser = user
      });
        this.shoppingCart = this.accountService.getShoppingCart();
        // this.getDeliveryOptions();
    }
    // getDeliveryOptions(){
    //      this.http.get(this.baseUrl+'delivery').subscribe({
    //       next: response => {this.deliveryOptions = response,
    //       console.log(response)},
    //       error:error=> console.log(error),
    //       complete:()=>console.log('get delivery options request is completed!')
    //     });
    // return this.deliveryOptions;
    // }

    // getSummaryByUserId(id: number){
    //   return this.http.get<Summary>(this.baseUrl+'summary/'+ id);
    // }s

    getDeliveryOptionById(id:any){
      return this.http.get<Delivery>(this.baseUrl+'delivery/'+ id);
    }

    setDeliveryInfo(info:DeliveryInfo){
      this.delInfo = {firstname:info.firstname,
                      lastname:info.lastname,
                      telephone:info.telephone,
                      email: info.email,
                      adress: info.adress,
                      additonalInfo:info.additonalInfo,
                      appUserId: info.appUserId, 
                      adressId: info.adressId};
      console.log(this.delInfo);
      return this.delInfo;
    }

    getDeliveryInfo(){
      return this.delInfo;
    }

    setAdress(adress:Adress){
      this.adress = {street: adress.street,
                    number: adress.number,
                    city: adress.city,
                    region:adress.region,
                    country:adress.country,
                    postcode:adress.postcode,
                    appUserId:this.currentUser.id}
      console.log(this.adress);
      return this.adress;
    }

    setPaymentInfo(card:Card){
      
    }

    sendOrder(order: Order){
      console.log(order);
      this.http.post<Order>(this.baseUrl + 'order/add',order).subscribe({
        next: response=> {this.order = response
        console.log(this.order)},
        error:error=>console.error(error)
        
      });
    }
  }  