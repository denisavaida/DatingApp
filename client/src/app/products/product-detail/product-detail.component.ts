import { HttpClient } from '@angular/common/http';
import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
// @Input() selectedProduct:any={};

product: Product | undefined;
categories: any={}
shoppingCart:ShoppingCart= {
  products: [] =[],
  total: 0,
  AppUserId: 0
};
currentUser: any; 
// galleryOptions: NgxGalleryOptions[]=[];
// galleryImages: NgxGalleryImage[]=[];

constructor( private productService: ProductService,private route: ActivatedRoute, private toastr: ToastrService, private accountService: AccountService,
   private cartService:CartService,private router: Router,private favouritesService: FavouritesService){  
  this.accountService.currentUser$.pipe((take(1))).subscribe({
  next: user=> this.currentUser = user
})
}

ngOnInit():void{
  //this.productService.getProducts();
  this.loadProduct();
  this.categories = this.productService.getCategories();
  // this.shoppingCart = this.accountService.getShoppingCart();
  // this.galleryOptions=[
  //   {
  //     width:'100px',
  //     height:'00px',
  //     imagePercent: 100,
  //     thumbnailsColumns:4,
  //     imageAnimation: NgxGalleryAnimation.Slide,
  //     preview:false
  //   }
  // ]
}
// getImages(){
//   if(!this.product) return [];
//   const imageUrls= [];
//   for(const photo of this.product.images){
//     imageUrls.push({
//       small: photo.url,
//       medium: photo.url,
//       big: photo.url
//     })
//   }
//   return imageUrls;
// }

loadProduct(){
  var id = this.route.snapshot.paramMap.get('id');
  if(!id) return;
  this.productService.getProduct(id).subscribe({
    next: product => {
      this.product = product;
      if(this.product.stock > 0){
        this.product.quantity = 1;
      }
      else{
        this.product.quantity = 0;
      }
      // this.galleryImages= this.getImages();
    }
  })
}
// getShoppingCart(){
//   var cart ;
//   if(this.loggedUser && this.shoppingCart){
//     if(this.shoppingCart.AppUserId == this.loggedUser.id){ 
//         cart = this.accountService.getShoppingCartById(this.shoppingCart.id);
         
//     }else{
//       this.shoppingCart.AppUserId = this.loggedUser.id;
//       cart = this.shoppingCart;
//     }
//   }
 
//   return cart;
    
// }

addToCart(prod:any){
  var prods = this.cartService.getItems();
  if(prods.length == 0){
    // prod.quantity = prod.quantity + 1;
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
  this.toastr.success('your product has been added to the cart!');
}
// addToShoppingCart(product:Product){
//   this.shoppingCart = this.accountService.getShoppingCart();
//   if(this.shoppingCart){
//     this.shoppingCart.products.push(product);
//     // this.shoppingCart.total = this.shoppingCart.total + product.price * product.quantity;
//     this.productService.addShoppingCart(this.shoppingCart).subscribe({
//       next:response=>{
//         localStorage.setItem('shoppingCart',JSON.stringify(product))
//         this.toastr.success("Item added to shopping cart")
//         console.log(response);
//         this.cancel;
//       },
//       error:error=>{
//         this.toastr.error(error.error)
//         console.log(error)
//       }
//     })
//   }else{
//     this.shoppingCart
//   }

//   console.log(this.shoppingCart);
//   console.log("ShoppingCart is undefined! ");
// }
addToFavourites(product:Product){
  var prods = this.favouritesService.getItems();
  if(prods.length == 0){
    // product.quantity = product.quantity + 1;
    this.favouritesService.addToFavourites(product);

  }else {
    if(this.favouritesService.findItem(product)){
      this.toastr.warning('You already have this product in favourites list !');
      return;
    }else{
      product.quantity = product.quantity + 1;
      this.favouritesService.addToFavourites(product);
      return;
    }
   }
  this.toastr.success("Product added to favourites! ");
}
// showDetails(){
//   this.productService.getProductDetails(this.selectedProduct.id).subscribe({
//     next:response=>{
//       this.router.navigateByUrl('/products')
//       console.log(response);
//       this.cancel;
//     },
//     error:error=>{
//       this.toastr.error(error.error);
//       console.log(error);
//     }
//   })
  
// }
// editProduct(){}
delete(){

}
cancel(){
  this.router.navigateByUrl('/products');
}
}