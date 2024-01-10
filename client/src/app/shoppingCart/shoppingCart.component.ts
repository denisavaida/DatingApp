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
import { VoucherDto } from '../_models/voucherDto';
import { Voucher } from '../_models/voucher';
import { VoucherService } from '../_services/voucher.service';

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
  }
  voucher:Voucher={
    code: '',
    discount: 0,
    validity: new Date,
    AppUserId: 0,
    available: true,
    id: 0
  }
  summary: Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: [],
    productCost: 0,
    voucherID: 0,
    discounted: 0
  };
  appliedVoucher:boolean = false;
  // products:Product[] = [];
  currentUser: any ={};
  prod: any={};
  delOptions: any = [];
  panelOpenState = false;
  cartUsersItems:any;
  cart:ShoppingCart[] = [];
  constructor( private accountService: AccountService,private cartService: CartService,private deliveryService:DeliveryService, private http:HttpClient, private voucherService:VoucherService,
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
      this.summary.productCost = this.summary.productCost + element.subtotal;
      this.summary.total = this.summary.productCost;
      this.summary.shoppingCartItems.push(element);
    });
    this.summary.AppUserId = this.currentUser.id;
    console.log(this.summary);
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
  applyVoucher(code: string){
    this.voucherService.getOneVoucherByUserId(this.currentUser.id).subscribe({
      next: voucher => {
        console.log(voucher);
        var codee = code.toUpperCase();
        console.log(codee);
        if(voucher.available == true){
          this.voucher = voucher;
          if(this.voucher.code == codee){
          
            this.summary.total = this.summary.total - this.summary.total * this.voucher.discount /100;
            this.summary.voucherID = this.voucher.id;
            // this.summary.shoppingCartId = this.shoppingCart.id;
            this.voucher.available = false;
            this.appliedVoucher = true;
            
            this.voucherService.updateVoucher(this.voucher);
            this.cartService.addSummary(this.summary);
            // this.summary.total = this.summary.productCost 
            console.log(this.voucher);
            console.log(this.summary);
          }else{
            this.toastr.warning("Your voucher code is incorrect !");
          }
        }else{
          this.toastr.warning("You have no vouchers available !");
          console.log(this.voucher);
        }
    }})
    return this.summary;
  }

  increaseQuantity(item: ShoppingCart, prod: Product){
    this.summary.shoppingCartItems = []
    this.summary.productCost = 0;
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
      
      this.summary.productCost = this.summary.productCost + this.cart[i].subtotal;
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
    window.history.back();
  }
}
