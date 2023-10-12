import { Component } from '@angular/core';
import { ShoppingCart } from '../_models/shopping-cart';
import { AccountService } from '../_services/account.service';
import {  take } from 'rxjs';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';
import { Order } from '../_models/order';
import { FavouritesService } from '../_services/favourites.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'shoppingCart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css']
})
export class ShoppingCartComponent {
  model:any={};
  baseUrl : string = 'https://localhost:5001/api/';
  items:Product[] = this.cartService.getItems();
  shoppingCart:ShoppingCart = {
    products: [],
    total: 0,
    AppUserId: 0
  }
  currentUser: any ={};
  prod: any={};
  // order: Order= {
  //   id: 0,
  //   shoppingCart: this.shoppingCart,
  //   shippingFee: 0,
  //   deliveryAddress: this.currentUser.Adress,
  //   billingAdress: this.currentUser.Adress,
  //   payment: undefined ,
  //   coupon: 0
  // }

  constructor( private accountService: AccountService, private cartService: CartService, private favouritesService: FavouritesService, private toastr: ToastrService,
    private router: Router){
      this.accountService.currentUser$.pipe((take(1))).subscribe({
        next: user=> this.currentUser = user
      })
      
    }

  ngOnInit():void{
    this.shoppingCart.products = this.cartService.getItems();
      this.shoppingCart.products.forEach(element => {
        element.subtotal = element.price * element.quantity;
        this.shoppingCart.total = this.shoppingCart.total + element.subtotal;
      });
      this.shoppingCart.AppUserId = this.currentUser.id;

    // this.getShoppingCart();
    // this.shoppingCart = this.productService.getShoppingCart(this.model.userId);
    
    //this.shoppingCart = localStorage.getItem('shoppingCart');
    // if(this.accountService.currentUser$.pipe(map(u => u?.id == this.shoppingCart?.userId))
    // .subscribe(next=>this.user.id = this.shoppingCart.userId)){
    //   if(!this.shoppingCart)return this.shoppingCart;
    //   this.productService.getShoppingCart(this.shoppingCart.id);
      
    // }
  }

  // getShoppingCart(){  
  //   this.shoppingCart.AppUserId = this.currentUser.id;
  //   // this.shoppingCart.products = this.cartService.getItems();
  //   if (this.items.length>0){
  //     this.items.forEach(element => {
  //       this.shoppingCart.products.push(element);
  //       element.subtotal = element.price * element.quantity;
  //       this.shoppingCart.total = this.shoppingCart.total+ element.subtotal;
  //     });
  //   }
  //   // this.shoppingCart.total = this.cartService.getTotal();
  //   console.log(this.items);
  //   console.log(this.shoppingCart);
  //   return this.shoppingCart;
  // }
  //   this.productService.addToShoppingCart(this.model).subscribe({
  //     next:response=>{
  //       this.toastr.success("Item added to shopping cart")
  //       console.log(response);
  //       this.cancel;
  //     },
  //     error:error=>{
  //       this.toastr.error(error.error)
  //       console.log(error)
  //     }
  //   })
  // }
  moveToFavourites(prod: Product){
    if(this.favouritesService.findItem(prod)){
      this.toastr.warning('You already have this product in favourites list !');
      return;
    }
    else{
      this.favouritesService.addToFavourites(prod);
      this.cartService.deleteItem(prod.id);
      this.toastr.show("Product moved to favourites!");
      this.shoppingCart.total = this.shoppingCart.total - prod.subtotal;
    }
    this.toastr.success('your product has been added to favourites!');
  }
  deleteProduct(prod: any){
    this.cartService.deleteItem(prod.id);
    this.toastr.show("Product deleted from shopping cart!");
    this.shoppingCart.total = this.shoppingCart.total - prod.subtotal;
  }
  increaseQuantity(prod: any){
    prod.subtotal = prod.price*prod.quantity;
    var items = this.cartService.getItems();
    this.shoppingCart.total = 0;
    items.forEach(element => {
    this.shoppingCart.total = this.shoppingCart.total + element.price*element.quantity;
    });

    
  }
  sendOrder(cart: ShoppingCart){
    console.log(this.shoppingCart);
  console.log(this.currentUser);
  }

  login(){}
  ProductExistsInShoppingCart(id: number){
    this.prod = localStorage.getItem("shoppingCart");
}
backToShop(){
  this.router.navigateByUrl('/products');
}
}
