import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Favourites } from 'src/app/_models/favourite';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

product: Product ={
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
  softDeleted: false,
  rating: 0
};
categories: any={}
shoppingCartItem:ShoppingCart= {
  quantity: 0,
  subtotal: 0,
  AppUserId: 0,
  productId: 0,
  id: 0,
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
    softDeleted: false,
    rating: 0
  }
};
favourites: Favourites= {
  products: [],
  AppUserId: 0,
  ProductId: 0
}

/// ADD SUMMARY!!!
currentUser: any; 
cart:any = {};
dbprods:any[]=[];

constructor( private productService: ProductService,private route: ActivatedRoute, private toastr: ToastrService, private accountService: AccountService,
   private cartService:CartService,private router: Router,private favouritesService: FavouritesService, private categoryService:CategoryService){  
  this.accountService.currentUser$.pipe((take(1))).subscribe({
  next: user=> this.currentUser = user
})

this.cart = this.accountService.getShoppingCart();
}

ngOnInit():void{
  this.loadProduct();
}
Handle(index:number){
  this.product.rating = index;
  this.productService.updateProduct(this.product);
  alert(`You rate ${index}`);
}
loadProduct(){
  var id = this.route.snapshot.paramMap.get('id');
  if(!id) return;
  this.productService.getProductById(id).subscribe({
    next: product => {
      this.product = product;
      console.log(this.product);
      if(this.product.stock > 0){
        this.product.quantity = 1;
      }
      else{
        this.product.quantity = 0;
      }
      
    }
  })
  return this.product;
}

addToCart(prod:Product){
  if(this.currentUser){
    console.log(prod);
    if(prod.stock == 0){
      this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
    }else{
  
      this.cart = this.accountService.getShoppingCart();
      if(this.cart.length == 0){
  
        this.shoppingCartItem = this.cartService.setShoppingCartItem(prod);
        console.log(this.shoppingCartItem);
        this.cartService.addToCart(prod);
        this.cartService.addShoppingCart(this.shoppingCartItem);
  
      }else {
  
        if(this.cartService.findItem(prod)){
          this.cartService.setItem(prod);
          return;
        }else{
          this.shoppingCartItem = this.cartService.setShoppingCartItem(prod);
          console.log(this.shoppingCartItem);
          this.cartService.addToCart(prod);
          this.cartService.addShoppingCart(this.shoppingCartItem);
          return;
        }
       }
    }
  }else{
    this.toastr.warning('You first need to login!');
  }
 
}

addToFavourites(product:Product){
  if(this.currentUser){
    var prods = this.favouritesService.getItems();
    if(prods.length == 0){
      this.favouritesService.addToFavourites(this.currentUser.id, product);
  
    }else {
      if(this.favouritesService.findItem(product)){
        this.toastr.warning('You already have this product in favourites list !');
        return;
      }else{
        this.favouritesService.addToFavourites(this.currentUser.id, product);
        return;
      }
     }
    this.toastr.success("Product added to favourites! ");
  }else{
    this.toastr.warning('You first need to login !');
  }
 
}

delete(){
  if(this.product){
    this.product.softDeleted = true;
    this.productService.updateProduct(this.product);
    this.router.navigateByUrl('/products');
  }

}
back(){
  window.history.back();
}
}