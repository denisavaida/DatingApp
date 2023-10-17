import { BehaviorSubject, take, map } from "rxjs";
import { Product } from "../_models/product";
import { ShoppingCart } from "../_models/shopping-cart";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AccountService } from "./account.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CartService{
    items: Product[] = [];
    shoppingCart:ShoppingCart = {
        products: [],
        total: 0,
        AppUserId: 0
    } ;
    cart:any;
    currentUser:any;
    baseUrl = environment.apiUrl;
    private currentShoppingCartSource= new BehaviorSubject<ShoppingCart | null>(null);
    constructor(private http: HttpClient,private accountService: AccountService){ 
        this.accountService.currentUser$.pipe((take(1))).subscribe({
            next: user=> this.currentUser = user
          });
          this.shoppingCart = this.getShoppingCart();
    }

    getShoppingCart(){
    this.shoppingCart.products = this.getItems();
    this.shoppingCart.total = 0;
    if (this.items.length>0){
        this.items.forEach(element => {
            // this.shoppingCart.products.push(element);
            this.shoppingCart.total = this.shoppingCart.total+ element.price * element.quantity;
        });
        }
        return this.shoppingCart;
    }

    getShoppingCartDB(id: any){
        this.http.get(this.baseUrl+'shoppingCart/'+id).subscribe({
          next:response=> this.cart = response,
          error:error=>console.log(error),
          complete:()=> console.log('get shopping cart Request has completed')
        })
      }
    
    addToCart(model: Product){
       
        this.items.push(model);
    }
    addShoppingCart(model:ShoppingCart){
        
        console.log(model);
        return this.http.post<ShoppingCart>(this.baseUrl + 'shoppingCart/add',model);
    }
    getItems(){
        return this.items;
    }
    itemsCount(){
        var buc = 0 ;
        if(this.items.length>0){
            this.items.forEach(element => {
                buc = buc + element.quantity;
            });
        }
        return buc;
    }
    clearCart(){
        this.items = [];
        return this.items;
    }
    deleteItem(id: any){
        for( var i=0; i< this.items.length; i++){
            if(this.items[i].id == id){
                this.items.splice(i,1);
            }
        }
    }
    findItem(prod:Product){
        var p; 
        this.items.forEach(element => {
            if(element.id == prod.id){
              p = element;  
            }
        });
        return p;
    }
    setItem(prod: Product){
        var p = this.findItem(prod);
        for(var i=0; i< this.items.length; i++){
            if(this.items[i] == p){
                this.items[i].quantity++;
                // this.items[i].price = this.items[i].price * this.items[i].quantity;
            }
        }
    }

}