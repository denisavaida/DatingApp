import { Component,  EventEmitter,  OnInit, Output } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Favourites } from 'src/app/_models/favourite';
import {  Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { Summary } from 'src/app/_models/summary';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  baseUrl = environment.apiUrl;
  products:any = [];
  categories: any = [];
  currentUser: any = {};
  searchItem:string = '';
  shoppingCartItem:ShoppingCart = {
    id: 0,
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
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
  favourites: Favourites= {
    products: [],
    AppUserId: 0,
    ProductId: 0
  };

  summary:Summary={
    AppUserId: 0,
    total: 0,
    shoppingCartItems: [],
    productCost: 0,
    voucherID: 0,
    discounted: 0
  }
  cart:any;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 8;

  startValue:any = 0;
  endValue: any = 500;

  sortingType:string="";
  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  constructor(private productService:ProductService,private cartService: CartService,private toastr:ToastrService, private router: Router,
    private accountService: AccountService, private favouritesService: FavouritesService, private categoryService:CategoryService,
    private route:ActivatedRoute){

    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    
    this.cart = this.accountService.getShoppingCart();
    // this.categories = this.categoryService.getCategories()
    
  }

  ngOnInit(){
    this.loadProducts();
    this.loadCategories();
  }
  Handle(index:number){
    alert(`You rate ${index}`);
    return index;
  }
  loadProducts(){
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe({
      next: response =>{
        this.products = response;
        if(response && response.pagination){
          this.products = response;
          this.pagination =  response.pagination;
        }
      }
    })
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:response=> {this.categories = response,
      console.log(this.categories)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get categories Request has completed')
    })
  }

  addToCart(prod:Product){
    if(this.currentUser){

    
    if(prod.stock == 0){
      this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
    }else{

      this.cart = this.accountService.getShoppingCart();
      if(this.cart.length == 0){
        this.summary.AppUserId = this.currentUser.id;
        
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
    }else{
      this.toastr.warning('You first need to login !');
    }
  }

  addToFavourites(prod: Product){
    if(this.currentUser){
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
    }else{
      this.toastr.warning('You first need to login !');
      }
  }

  deleteProduct(prod: Product){
    prod.softDeleted = true;
    this.productService.updateProduct(prod);
    window.location.reload();
  }
  sliderValueChanged(){ 
    this.productService.getRangeProducts(this.startValue, this.endValue)
    .subscribe({next: response=>this.products = response});
  }
  inStockProducts(){
    this.productService.getInStockProducts()
    .subscribe({next: response=>this.products = response});
  }
  sortAscending(){
    this.sortingType = 'ascending';
    this.productService.getSortedProds(this.sortingType)
    .subscribe({next: response=>this.products = response});
  }
  sortDescending(){
    this.sortingType = 'descending';
    this.productService.getSortedProds(this.sortingType)
    .subscribe({next: response=>this.products = response});
  }
  sortBiggestDiscount(){
    this.sortingType = 'discount';
    this.productService.getSortedProds(this.sortingType)
    .subscribe({next: response=>this.products = response});
  }
  sortPopular(){
    this.sortingType = 'popular';
    this.productService.getSortedProds(this.sortingType)
    .subscribe({next: response=>this.products = response});
  }
  categorizedProducts(categ:string){
    this.productService.getProductsBySelectedCategory(categ).subscribe({
      next: response => this.products = response
    })
  }
  pageChanged(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadProducts();
    }
  }

  search(){
    this.productService.getSearchProducts(this.searchItem)
    .subscribe({next: response=>this.products = response});
  }

  refresh(){
    // var flag = this.route.snapshot.paramMap.has('products');
    // if(flag){
      window.location.reload();
    // }else{
    //   this.router.navigateByUrl('/products');
    // }
  }


}
