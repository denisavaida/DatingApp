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
    products: [] = [],
    total: 0,
    AppUserId: 0
  } ;

  constructor(private http:HttpClient,private productService:ProductService,private cartService: CartService,private toastr:ToastrService, 
    private accountService: AccountService, private favouritesService: FavouritesService){
    this.getProducts();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
 //this.shoppingCart = this.accountService.shoppingCart;
    
  }
  getProducts(){
    return this.http.get(this.baseUrl+'products').subscribe({
      next:response=> {this.products = response,
        this.products.forEach((element: Product) => {
          if(element.discount > 0){
            this.promo.push(element);
          }
        });
        return this.promo;
      },
      error:error=>console.log(error),
      complete:()=> console.log(' get products Request has completed')
    })
  }
  addToCart(prod:any){
    if(prod.stock == 0){
      this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
    }else{
      var prods = this.cartService.getItems();

      if(prods.length == 0){
        prod.quantity++;
        prod.subtotal = prod.price * prod.quantity;
        this.cartService.addToCart(prod);
    
      }else {
        if(this.cartService.findItem(prod)){
          this.cartService.setItem(prod);
          return;
        }else{
          prod.quantity = prod.quantity + 1;
          this.cartService.addToCart(prod);
          return;
        }
       }
      // this.productService.addShoppingCart(this.shoppingCart).subscribe({
      //   next:response=>{
      //     this.toastr.success("Shopping cart added to db!")
      //     console.log(response);
      //     this.cancel;
      //   },
      //   error:error=>{
      //     this.toastr.error(error.error)
      //     console.log(error)
      //   }
      // }) 
      this.toastr.success('your product has been added to the cart!');
    }
  
  }
  addToFavourites(prod: Product){
    this.favouritesService.addToFavourites(prod);
    this.toastr.success('your product has been added to favourites!');
  }

  deleteProduct(prod: Product){
      this.productService.deleteProduct(prod);
  }

}
