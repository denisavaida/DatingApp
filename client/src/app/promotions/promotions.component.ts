import { Component, Input } from '@angular/core';
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
import { Pagination } from '../_models/pagination';
import { PromotionService } from '../_services/promotion.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/category';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  baseUrl = environment.apiUrl;
  @Input() products:any;
  favourites: Product[] = [];
  currentUser: any = {};
  shoppingCart:ShoppingCart = {
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
  } ;
  cart:any =[];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 8;
  categories: Category[]=[];
  searchItem:string = '';
  startValue:any = 0;
  endValue: any = 500;
  sortingType:string="";
  constructor(private http:HttpClient,private promotionService:PromotionService,private cartService: CartService,
    private toastr:ToastrService, private productService: ProductService,private categoryService:CategoryService,
    private accountService: AccountService, private favouritesService: FavouritesService){

    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    })
    this.cart = this.accountService.getShoppingCart();
    
  }
  ngOnInit(){
      this.loadProducts();
      this.loadCategories();
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
  loadProducts(){
    this.promotionService.getProducts(this.pageNumber, this.pageSize).subscribe({
      next: response =>{
        // this.products = response;
        
        if(response && response.pagination){
            
          this.products = response;
          console.log(this.products);
          this.pagination =  response.pagination;
          
        }
      }
    })
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
  pageChanged(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadProducts();
    }
  }

  addToCart(prod:any){
    if(this.currentUser){
      this.shoppingCart.AppUserId = this.currentUser.id;
      console.log(prod);
      if(prod.stock == 0){
        this.toastr.warning("You can't add this product to the shopping cart because is out of stock !");
      }else{
    
        this.cart = this.accountService.getShoppingCart();
        if(this.cart.length == 0){
    
          this.shoppingCart = this.cartService.setShoppingCartItem(prod);
          this.shoppingCart.AppUserId = this.currentUser.id;
          this.cartService.addToCart(prod);
          this.cartService.addShoppingCart(this.shoppingCart);
    
        }else {
    
          if(this.cartService.findItem(prod)){
            this.cartService.setItem(prod);
            return;
          }else{
            this.shoppingCart = this.cartService.setShoppingCartItem(prod);
            this.shoppingCart.AppUserId = this.currentUser.id;
            this.cartService.addToCart(prod);
            this.cartService.addShoppingCart(this.shoppingCart);
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
      this.favouritesService.addToFavourites(this.currentUser.id, prod);
      this.toastr.success('your product has been added to favourites!');
    }else{
      this.toastr.warning('You first need to login!');
    }
   
  }

  deleteProduct(prod: Product){
    prod.softDeleted = true;
      this.productService.updateProduct(prod);
  }
  inStockProducts(){
    this.productService.getInStockProducts()
    .subscribe({next: response=>this.products = response});
  }
  categorizedProducts(categ:string){
    this.productService.getProductsBySelectedCategory(categ).subscribe({
      next: response => this.products = response
    })
  }
  sliderValueChanged(){ 
    this.productService.getRangeProducts(this.startValue, this.endValue)
    .subscribe({next: response=>this.products = response});
  }

}
