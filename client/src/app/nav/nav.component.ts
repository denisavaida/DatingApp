import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, map, of, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { ShoppingCart } from '../_models/shopping-cart';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { FavouritesService } from '../_services/favourites.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() model: any = {};
  @Output() currentUser$: Observable<User | null> = of(null);
  shoppingCart: ShoppingCart = {
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    id: 0,
    product: {}
  }
  currentUser:any;
  cart:any;
user:any;
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService,private favouritesService: FavouritesService, private productService:ProductService, private cartService: CartService){
    // this.user = this.accountService.loadUser();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
  }
  ngOnInit() :  void{
    // this.cart = this.accountService.getShoppingCart();
  }

  cartItemCount(){
    return this.cartService.itemsCount();
  }
  favItemCount(){
    return this.favouritesService.itemsCount();
  }
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {this.router.navigateByUrl('/products')
      this.toastr.success("You are logged in ! ")},
      
      error : error =>{
        console.log(error)
      }
    })
    this.shoppingCart.AppUserId = this.model.id;

    // this.accountService.setCurrentUser(this.model);
    // this.user = this.accountService.getCurrentUser();
    // console.log(this.user);
    // if(this.user){
    //   this.cartService.getShoppingCartDB(this.user.id);
    // }
  }
  logout(){
    this.accountService.logout();
    this.toastr.show("You are now logged out !")
    this.router.navigateByUrl('/');
  }

}
