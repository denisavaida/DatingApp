import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { TmplAstHoverDeferredTrigger } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Favourites } from 'src/app/_models/favourite';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { Summary } from 'src/app/_models/summary';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  @Input() product: Product | undefined;
  baseUrl = environment.apiUrl;
  products:any;

  currentUser: any = {};
  shoppingCartItem:ShoppingCart = {
    id: 0,
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    product: {}
  }
  favourites: Favourites= {
    products: [],
    AppUserId: 0,
    ProductId: 0
  };

  summary:Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: []
  }
  cart:any;

  constructor(private http:HttpClient,private productService:ProductService,private cartService: CartService,private toastr:ToastrService, private router: Router,
    private accountService: AccountService, private favouritesService: FavouritesService){
    this.getProducts();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    
    this.cart = this.accountService.getShoppingCart();
 //this.shoppingCart = this.accountService.shoppingCart;
    
  }

  ngOnInit(){
    this.products = this.cartService.getItems();
    // this.summary.shoppingCartItems = this.cart;
  }

  getProducts(){
    return this.http.get(this.baseUrl+'products').subscribe({
      next:response=> {this.products = response
      this.productService.validateProds(this.products)},
      error:error=>console.log(error),
      complete:()=> console.log(' get products Request has completed')
    })

  }

  addToCart(prod:Product){
    console.log(prod);
    if(prod.stock == 0){
      this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
    }else{

      this.cart = this.accountService.getShoppingCart();
      if(this.cart.length == 0){

        this.shoppingCartItem = this.cartService.setShoppingCartItem(prod);
        
        this.shoppingCartItem.AppUserId = this.currentUser.id;
        console.log(this.shoppingCartItem);
        this.cartService.addToCart(prod);
        this.cartService.addShoppingCart(this.shoppingCartItem);

      }else {

        if(this.cartService.findItem(prod)){
          this.cartService.setItem(prod);
          return;
        }else{
          this.shoppingCartItem = this.cartService.setShoppingCartItem(prod);
          
        this.shoppingCartItem.AppUserId = this.currentUser.id;
        this.cartService.addToCart(prod);
          this.cartService.addShoppingCart(this.shoppingCartItem);
          return;
        }
       }
    }
  }
  addToFavourites(prod: Product){
    var prods = this.accountService.getFavourites();
    if(prods.length == 0){
      this.favouritesService.addToFavourites(this.currentUser.id, prod);
    }else {
      if(this.favouritesService.findItem(prod)){
        this.toastr.warning('You already have this product in favourites list !');
        return;
      }else{
        this.favouritesService.addToFavourites(this.currentUser.id,prod);
        return;
      }
     }
    this.toastr.success('your product has been added to favourites!');
  }

  deleteProduct(prod: Product){
    prod.isDeleted = true;
    this.productService.updateProduct(prod);
    window.location.reload();
  }

  cancel(){
    this.router.navigateByUrl('/products');
  }
}
