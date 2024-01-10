import { BehaviorSubject, take, map } from "rxjs";
import { Product } from "../_models/product";
import { ShoppingCart } from "../_models/shopping-cart";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { AccountService } from "./account.service";
import { ProductService } from "./product.service";
import { ToastrService } from "ngx-toastr";
import { Summary } from "../_models/summary";

@Injectable({
    providedIn: 'root'
  })
export class CartService{
    items: Product[] = [];
    private currentCartSource= new BehaviorSubject<ShoppingCart | null>(null);
    shoppingCartItem:ShoppingCart ={
      id: 0,
      quantity: 0,
      subtotal: 0,
      AppUserId: 0,
      productId: 0,
      product: {
        id: 0,
        name: "",
        description: "",
        quantity: 0,
        category: "",
        oldPrice: 0,
        price: 0,
        image: "",
        stock: 0,
        images: [],
        discount: 0,
        shoppingCartId: 0,
        softDeleted: false,
        rating: 0
      }
    }
    summary: Summary={
      AppUserId: 0,
      total: 0,
      shoppingCartItems: [],
      productCost: 0,
      voucherID: 0,
      discounted: 0
    }
    cart:any={};
    currentUser:any;
    baseUrl = environment.apiUrl;
    prod : any = {};

    constructor(private http: HttpClient, private accountService: AccountService, private productService:ProductService,private toastr: ToastrService){ 
          this.cart = this.accountService.getShoppingCart();
          this.items = this.getUsersCartItems();
    }

    getUsersCartItems(){
      this.cart = this.accountService.getShoppingCart();
      if(this.cart.length != 0){
        for(var i = 0; i< this.cart.length; i++){
          this.productService.getProductById(this.cart[i].productId).subscribe({next: response => {this.prod = response;
  
            this.items.push(this.prod);
          }});
  
          this.summary.total = this.summary.total + this.cart[i].subtotal;
          
        };   
          for(var i = 0; i< this.cart.length; i++){
            for(var j = 0; j< this.items.length; j++){
              if(this.cart[i].productId == this.items[j].id){
                this.items[j].quantity = this.cart[i].quantity;
              }
          }
        }
      }
      return this.items;
    }
      
    getShoppingCartDB(id: any){
       return  this.http.get(this.baseUrl+'shoppingCart/'+id);
    }

    addToCart(prod:any){
      this.items.push(prod);
    }

    addShoppingCart(model:ShoppingCart){
      
        console.log(model);
        return this.http.post<ShoppingCart>(this.baseUrl + 'shoppingCart/add',model).subscribe({
          next:response=>{
            this.toastr.success("Shopping cart added to db!")
            console.log(response);
            return response;
          },
          error:error=>{
            this.toastr.error(error.error)
            console.log(error)
          }
        }) 
    }

    addSummary(summary:Summary){
      console.log(summary);
        return this.http.post<Summary>(this.baseUrl + 'summary/add',summary).subscribe({
          next:response=>{
            console.log(response);
            return response;
          },
          error:error=>{
            this.toastr.error(error.error)
            console.log(error)
          }
        }) 
    }

    setShoppingCartItem(prod: Product){
      this.shoppingCartItem.quantity = this.shoppingCartItem.quantity + prod.quantity;
      this.shoppingCartItem.product = prod;
      this.shoppingCartItem.subtotal = this.shoppingCartItem.product.price * this.shoppingCartItem.quantity;
      this.shoppingCartItem.productId = prod.id;
      return this.shoppingCartItem;
    }
    
    setSummary(shoppingCartItem: ShoppingCart){
      this.summary.shoppingCartItems.push(shoppingCartItem);
      this.summary.productCost = shoppingCartItem.subtotal;
      this.summary.total = shoppingCartItem.subtotal;
      
      return this.summary;
    }
    
    getItems(){
        this.getUsersCartItems();
      
        console.log(this.items);
        return this.items;
    }
    itemsCount(){
        
        return this.cart.length;
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
        // return this.http.delete<Product>(this.baseUrl+'shoppingCart/delete/'+id).subscribe(data => {
        //     console.log(data);
        // });
    }
    deleteCartItem(id:number){
        return this.http.delete<ShoppingCart>(this.baseUrl+'shoppingCart/delete/'+id).subscribe(
            data => {
            console.log(data);
        });
    }

    findItem(prod:Product){
        var flag = false; 
        this.cart = this.accountService.getShoppingCart();
        for(var i=0; i< this.cart.length;i++){
            if(this.cart[i].productId == prod.id){
              flag = true; 
            }
            if(flag == true){
                this.setItem(prod);
            }else{
                return flag;
            }
        };
        console.log(flag);
        return flag;
    }

    setItem(prod: Product){
        
        this.cart = this.accountService.getShoppingCart();
        for(var i=0; i< this.cart.length;i++){
            if(this.cart[i].productId == prod.id){
                this.cart[i].quantity++;
                this.cart[i].subtotal = this.cart[i].quantity* this.cart[i].product.price;

                console.log(this.cart[i]);
                this.updateShoppingCart(this.cart[i]);

        }
      }
    }
    
    updateShoppingCart(cart:ShoppingCart){
      console.log(cart);
        return this.http.put<ShoppingCart>(this.baseUrl + 'shoppingCart/update',cart).pipe(
            map(c=>{
              if(c){
                localStorage.setItem('updatedCart',JSON.stringify(c));
                console.log("Cart is: "+c);
                this.currentCartSource.next(c);
              }
              return c;
            })
          )
    }
    
    updateSummary(summary:Summary){
      console.log(summary);
      return this.http.put<Summary>(this.baseUrl + 'summary/update',summary).pipe(
          map(c=>{
            if(c){
              localStorage.setItem('updatedSummary',JSON.stringify(c));
              console.log("Summary is: "+c);
            }
            return c;
          })
        )
    }
}