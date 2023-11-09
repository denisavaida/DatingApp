import { Component } from '@angular/core';
import { Product } from '../_models/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { FavouritesService } from '../_services/favourites.service';
import { ShoppingCart } from '../_models/shopping-cart';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  baseUrl = environment.apiUrl;
  products:any;
  favourites: Product[] = [];
  promo: Product[] = [];
  currentUser: any = {};
  shoppingCart:ShoppingCart = {
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    id: 0,
    product: {}
  } ;
cart:any =[];
  constructor(private http:HttpClient,private productService:ProductService,private cartService: CartService,private toastr:ToastrService, 
    private accountService: AccountService, private favouritesService: FavouritesService){
    this.getProducts();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
 this.cart = this.accountService.getShoppingCart();
    
  }
  getProducts(){
    return this.http.get(this.baseUrl+'products').subscribe({
      next:response=> {this.products = response,
        this.products.forEach((element: Product) => {
          if(element.discount > 0 ){ //&& element.stock>0
            this.promo.push(element);
          }
        });
        this.productService.validateProds(this.promo);
      },
      error:error=>console.log(error),
      complete:()=> console.log(' get products Request has completed')
    })
  }

  addToCart(prod:any){
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
  addToFavourites(prod: Product){
    this.favouritesService.addToFavourites(this.currentUser.id, prod);
    this.toastr.success('your product has been added to favourites!');
  }

  deleteProduct(prod: Product){
    prod.isDeleted = true;
      this.productService.updateProduct(prod);
  }

}
