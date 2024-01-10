import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of, take } from 'rxjs';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCart } from '../_models/shopping-cart';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { FavouritesService } from '../_services/favourites.service';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() model: any = {};
  @Output() currentUser$: Observable<User > = of();
  shoppingCart: ShoppingCart = {
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
  category:Category = {
    id: 0,
    name: ''
  };
  categoriesDB:Category[] = []
  currentUser:any;
  cart:any;
user:any;
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService,private favouritesService: FavouritesService, 
    private productService:ProductService, private cartService: CartService,private categoryService:CategoryService, private route:ActivatedRoute){
    // this.user = this.accountService.loadUser();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })

  }
  ngOnInit() :  void{
    this.loadCategories();
    // this.cart = this.accountService.getShoppingCart();
  }
  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:response=> {this.categoriesDB = response,
      console.log(this.categoriesDB)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get categories Request has completed')
    })
    
  }
  cartItemCount(){
    return this.cartService.itemsCount();
  }
  favItemCount(){
    return this.favouritesService.itemsCount();
  }
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/products')
      this.toastr.success("You are logged in ! ")},
      
      error : error =>{
        console.log(error)
      }
    })
    // this.currentUser$ = new Observable<User>((ob)=>{ob.next(this.model), ob.complete()}) ; 
    // this.currentUser$.subscribe();
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
