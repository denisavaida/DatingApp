import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Delivery } from "../_models/deliveryMethod";
import { BehaviorSubject, map } from "rxjs";
import { RouterModule } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class DeliveryService {
    private currentDeliverySource= new BehaviorSubject<Delivery | null>(null);
    baseUrl = environment.apiUrl;
    shoppingCart: any={}
    deliveryOptions:any = {}
    selectedOption:any;
    isSelected: boolean = false;
    constructor(private http: HttpClient){ 
        this.getDeliveryOptions();
    }
    getDeliveryOptions(){
        this.http.get(this.baseUrl+'delivery')
        .subscribe({
          next: response => {this.deliveryOptions = response},
          error:error=> console.log(error),
          complete:()=>console.log('get delivery options request is completed!')
        });
        return this.deliveryOptions;
    }

    getDeliveryOptionById(id:any){
     return this.http.get<Delivery>(this.baseUrl+'delivery/'+ id);
    }
    // setSelectedDelivery(id:any){
    //     return this.getDeliveryOptionById(id);
    // }
    getSelectedOption(){
      if(this.isSelected == true){
        
      console.log(this.selectedOption);
      return this.selectedOption;
      }
      return this.isSelected;
    }

    addDelivery(model:Delivery){
        return this.http.post<Delivery>(this.baseUrl + 'delivery/add',model).pipe(
            map(delivery=>{
              if(delivery){
                localStorage.setItem('delivery',JSON.stringify(delivery));
                this.currentDeliverySource.next(delivery);
              }
              return delivery;
            })
          )
    }

    updateDelivery(model: Delivery){
        return this.http.put<Delivery>(this.baseUrl + 'delivery/update',model).pipe(
            map(opt=>{
              if(opt){
                localStorage.setItem('delivery',JSON.stringify(opt));
                console.log("Delivery option is: "+opt);
                this.currentDeliverySource.next(opt);
              }
              return opt;
            })
          )
    }

    deleteDelivery(model:Delivery){
    return this.http.delete<Delivery>(this.baseUrl+'delivery/delete/'+model.id).subscribe(data => {
        console.log(data);
        window.location.reload();
      });
    }

  }  