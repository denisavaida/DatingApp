import { Component } from '@angular/core';
import { ShoppingCart } from '../_models/shopping-cart';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';
import { FavouritesService } from '../_services/favourites.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeliveryService } from '../_services/delivery.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { take } from 'rxjs';
import { Summary } from '../_models/summary';

@Component({
  selector: 'shoppingCart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css']
})
export class ShoppingCartComponent {
  model:any={};
  baseUrl : string = 'https://localhost:5001/api/';
  items:Product[]  = [];
  shoppingCart:ShoppingCart = {
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    id: 0,
    product: {}
  }
  summary: Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: []
  };
  // products:Product[] = [];
  currentUser: any ={};
  prod: any={};
  delOptions: any = [];
  panelOpenState = false;
  cartUsersItems:any;
  cart:ShoppingCart[] = [];
  constructor( private accountService: AccountService,private cartService: CartService,private deliveryService:DeliveryService, private http:HttpClient,
     private favouritesService: FavouritesService, private toastr: ToastrService, private router: Router, private productService: ProductService){
      this.accountService.currentUser$.pipe((take(1))).subscribe({
        next: user=> {this.currentUser = user;
        }
      })
      this.cart = this.accountService.getShoppingCart();
      this.items = this.getUsersCartItems();
      this.delOptions = this.deliveryService.getDeliveryOptions();
    }

  ngOnInit():void{
    this.cart.forEach(element => {
      this.summary.total = this.summary.total + element.subtotal;
      this.summary.shoppingCartItems.push(element);
    });
      console.log(this.summary.total);
      this.summary.AppUserId = this.currentUser.id;
      
  }

  getUsersCartItems(){
    if(this.cart.length != 0){
      for(var i = 0; i< this.cart.length; i++){
        this.productService.getProductById(this.cart[i].productId).subscribe({next: response => {this.prod = response;

          this.items.push(this.prod);
        }});
      };   
    }
    return this.items;
  }

  moveToFavourites(prod: Product){
    if(this.favouritesService.findItem(prod)){
      this.toastr.warning('You already have this product in favourites list !');
      return;
    }
    else{
      this.favouritesService.addToFavourites(this.currentUser.id ,prod);
      this.deleteProduct(prod);
      this.toastr.success('your product has been added to favourites!');
    }
  }

  deleteProduct(prod: any){
    for(var i=0;i<this.cart.length;i++){
      if(this.cart[i].productId == prod.id){
        console.log(this.cart[i].id);
        this.cartService.deleteCartItem(this.cart[i].id);
        
      this.summary.total = this.summary.total - this.cart[i].subtotal;
      }
    }
    this.toastr.show("Product deleted from shopping cart!");
    
  }

  increaseQuantity(item: ShoppingCart, prod: Product){
    this.summary.shoppingCartItems = []
    this.summary.total = 0;
    console.log(item.quantity);
    this.shoppingCart.quantity = item.quantity;
    this.shoppingCart.product = prod;
    this.shoppingCart.subtotal = this.shoppingCart.product.price*item.quantity;
    item.subtotal = item.quantity * item.product.price;
    
   for(var i=0;i<this.cart.length;i++){
      if(this.cart[i].productId == item.productId){
        this.cart[i].quantity = this.shoppingCart.quantity;
        this.cart[i].subtotal = this.shoppingCart.subtotal;
        this.cartService.updateShoppingCart(item).subscribe();
      }
      
      this.summary.total = this.summary.total + this.cart[i].subtotal;
      this.summary.shoppingCartItems.push(this.cart[i]);
    };
  }
  // updateQuantity(item:any){
  //   this.cartService.updateShoppingCart(item).subscribe();
  // }
  login(){}

  ProductExistsInShoppingCart(id: number){
    this.prod = localStorage.getItem("shoppingCart");
  }
  back(){
    this.router.navigateByUrl('/products');
  }
}
