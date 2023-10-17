import { HttpClient } from '@angular/common/http';
import { TmplAstHoverDeferredTrigger } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
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
  favourites: Product[] = [];
  currentUser: any = {};
  shoppingCart:ShoppingCart = {
    products: [] = [],
    total: 0,
    AppUserId: 0
  } ;

  constructor(private http:HttpClient,private productService:ProductService,private cartService: CartService,private toastr:ToastrService, private router: Router,
    private accountService: AccountService, private favouritesService: FavouritesService){
    this.getProducts();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
 //this.shoppingCart = this.accountService.shoppingCart;
    
  }

  ngOnInit(){
    //this.shoppingCart = this.accountService.getShoppingCart();
  }

  getProducts(){
    return this.http.get(this.baseUrl+'products').subscribe({
      next:response=> this.products = response,
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

        this.shoppingCart = this.cartService.getShoppingCart();
        this.shoppingCart.AppUserId = this.currentUser.id;
        console.log(this.shoppingCart);
        
      //   this.cartService.addShoppingCart(this.shoppingCart).subscribe({
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
    
      }else {
        if(this.cartService.findItem(prod)){
          this.cartService.setItem(prod);
          return;
        }else{
          prod.quantity = prod.quantity + 1;
          this.cartService.addToCart(prod);
          // this.shoppingCart = this.cartService.getShoppingCart();
          this.shoppingCart.AppUserId = this.currentUser.id;
          this.shoppingCart.products = this.cartService.getItems();
        //   this.cartService.addShoppingCart(this.shoppingCart).subscribe({
        //     next:response=>{
        //       this.toastr.success("Shopping cart added to db!")
        //       console.log(response);
        //       this.cancel;
        //     },
        //     error:error=>{
        //       this.toastr.error(error.error)
        //       console.log(error)
        //     }
        //   }) 
        //   return;
        }
       }

      this.toastr.success('your product has been added to the cart!');
    }
  
  }
  // addToShoppingCart(product:Product){
  //   if(this.shoppingCart){
  //     this.shoppingCart.products.push(product);
  //     // this.shoppingCart.AppUserId = this.currentUser.id;
  //     console.log(this.shoppingCart.AppUserId + '=> userid');
  //     // this.shoppingCart.total = this.shoppingCart.total + product.price * product.quantity;
  //     this.productService.addShoppingCart(this.shoppingCart).subscribe({
  //       next:response=>{
  //         this.toastr.success("Item added to shopping cart")
  //         console.log(response);
  //         this.cancel;
  //       },
  //       error:error=>{
  //         this.toastr.error(error.error)
  //         console.log(error)
  //       }
  //     })
      
  //   }
  //   console.log(product);
  //   console.log("Added to shopping cart ! ");
  // }

  addToFavourites(prod: Product){
    var prods = this.favouritesService.getItems();
    if(prods.length == 0){
      // prod.quantity = prod.quantity + 1;
      prod.price = prod.price * prod.quantity;
      this.favouritesService.addToFavourites(prod);
  
    }else {
      if(this.favouritesService.findItem(prod)){
        this.toastr.warning('You already have this product in favourites list !');
        return;
      }else{
        prod.quantity = prod.quantity + 1;
        this.favouritesService.addToFavourites(prod);
        return;
      }
     }
    this.toastr.success('your product has been added to favourites!');
  }

  deleteProduct(prod: Product){
      this.productService.deleteProduct(prod);
      this.router.navigateByUrl('/products');
  }

  cancel(){
    this.router.navigateByUrl('/products');
  }
}
