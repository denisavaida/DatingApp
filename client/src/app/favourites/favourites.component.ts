import { Component } from '@angular/core';
import { Product } from '../_models/product';
import { FavouritesService } from '../_services/favourites.service';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCart } from '../_models/shopping-cart';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  favourites:any={};
  products:any = {};
  shoppingCart: ShoppingCart= {
    id: 0,
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    product: {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      category: '',
      oldPrice: 0,
      price: 0,
      image: '',
      stock: 0,
      images: [],
      discount: 0,
      shoppingCartId: 0,
      softDeleted: false
    }
  }
  currentUser:any;
  cart: any =[];
  constructor(private favouritesService: FavouritesService, private accountService: AccountService, private router:Router, private cartService:CartService, private toastr: ToastrService){
    this.favourites = this.favouritesService.getItems();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    
    this.cart = this.accountService.getShoppingCart();
    this.favourites = this.accountService.getFavourites();
    this.favourites.products = this.favouritesService.getUsersFavItems();
  }

  addToShoppingCart(prod:Product){
    this.shoppingCart.AppUserId = this.currentUser.id;
    console.log(prod);
    if(prod.stock == 0){
      this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
    }else{
  
      this.cart = this.accountService.getShoppingCart();
      if(this.cart.length == 0){
  
        this.shoppingCart = this.cartService.setShoppingCartItem(prod);
        this.shoppingCart.AppUserId = this.currentUser.id;
        this.cartService.addToCart(prod);
        this.cartService.addShoppingCart(this.shoppingCart);
  
      }else {
  
        if(this.cartService.findItem(prod)){
          this.cartService.setItem(prod);
          return;
        }else{
          this.shoppingCart = this.cartService.setShoppingCartItem(prod);
          this.shoppingCart.AppUserId = this.currentUser.id;
          this.cartService.addToCart(prod);
          this.cartService.addShoppingCart(this.shoppingCart);
          return;
        }
       }
    }
  }
  deleteProduct(id: any){
    this.favouritesService.deleteItem(id);
    this.toastr.warning("Product deleted from favourites list!");
  }
  login(){}
  back(){
    window.history.back();
  }
}
