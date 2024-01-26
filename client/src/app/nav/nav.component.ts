import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, map, of, switchMap, take } from 'rxjs';
import {  ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle, Params, RouteReuseStrategy, Router, RouterState } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCart } from '../_models/shopping-cart';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { FavouritesService } from '../_services/favourites.service';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

@Injectable()
export class MyStrategy extends RouteReuseStrategy {
   shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    return null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}

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
    id: 0,
    product: {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      category: {
        id: 0,
        name: ''
      },
      oldPrice: 0,
      price: 0,
      image: '',
      stock: 0,
      images: [],
      discount: 0,
      softDeleted: false,
      rating: 0,
      categoryGender: {
        id: 0,
        name: ''
      },
      subcategory: {
        id: 0,
        name: '',
        productCategoryId: 0
      }
    },
    summary: {
      AppUserId: 0,
      productCost: 0,
      discounted: 0,
      total: 0,
      shoppingCartItems: [],
      voucherID: 0
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
json:any;
params: Observable<Params> | undefined;
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService,private favouritesService: FavouritesService, 
    private cartService: CartService,private categoryService:CategoryService, private route:ActivatedRoute,private ref: ChangeDetectorRef){
    // this.user = this.accountService.loadUser();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
   
  }
  ngOnInit() :  void{
    this.loadCategories();
    this.json = localStorage.getItem('user');
    if(this.json){
      this.model = JSON.parse(this.json);
    }
    console.log(this.model);
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
        // setInterval(()=>{this.ref.markForCheck();},1000);
        console.log(this.model);
        if(this.model.userName == 'admin'){
          this.router.navigateByUrl('/administration');
        }else{
          //  this.accountService.getUserByName(this.model.userName)
          // .subscribe({next: response=>this.user = response});
          // this.
        }
        this.toastr.success("You are logged in ! ")
      },
      error : error =>{
        console.log(error)
      }
    })

    // this.currentUser$ = new Observable<User>((ob)=>{ob.next(this.model), ob.complete()}) ; 
    // this.currentUser$.subscribe();
    this.shoppingCart.AppUserId = this.model.id;
    // let urlstr='';
    // const url: Observable<string> = this.route.url.pipe(map(segments => urlstr = segments.join('')));
    // this.router.navigateByUrl(urlstr);
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
