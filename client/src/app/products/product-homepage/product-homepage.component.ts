import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { CategoryGender } from 'src/app/_models/category-gender';
import { Favourites } from 'src/app/_models/favourite';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ShoppingCart } from 'src/app/_models/shopping-cart';
import { Subcategory } from 'src/app/_models/subcategory';
import { Summary } from 'src/app/_models/summary';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { FavouritesService } from 'src/app/_services/favourites.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.css']
})
export class ProductHomepageComponent {
  baseUrl = environment.apiUrl;
  products:any = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  categoryGenders: CategoryGender[]=[];

  categIdSelected :any= 0;
  subcategIdSelected = 0;
  categGenderIdSelected = 0;

  currentUser: any = {};
  searchItem:string = '';
  shoppingCartItem:ShoppingCart = {
    id: 0,
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
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
  isHomeCateg: boolean = true;
  isPromoPage: boolean = false;
  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();
  pageName:any = '';
  condition:any=[{pageName:'Toate produsele',routePath:'/products/all-products',selector:'<app-product-card [products]="products"></app-product-card>'},
  {pageName:'Promotii',routePath:'/products/promotions', selector:'<app-promotions [products]="products"></app-promotions>'},
  {pageName:'Categorii',routePath:'/products/categorizedProducts/'},
  {pageName:'Toate produsele',routePath:'/products/all-products'},
]
  constructor(private productService:ProductService,private cartService: CartService,private toastr:ToastrService, private bcService:BreadcrumbService,
    private accountService: AccountService, private favouritesService: FavouritesService, private categoryService:CategoryService,private router:Router)
    {
      this.accountService.currentUser$.pipe((take(1))).subscribe({
        next: user=> this.currentUser = user
      })
      
      this.cart = this.accountService.getShoppingCart();
      // this.categories = this.categoryService.getCategories()
      
    }

  ngOnInit(){
    this.loadProducts();
    this.getCategories();
    this.getSubcategories();
    this.getCategoryGenders();
    // this.loadCategories();
    // this.loadSubcategories();
    // this.loadCategoryGenders();
  }
  Handle(index:number){
    alert(`You rate ${index}`);
    return index;
  }
  loadProducts(){
    this.productService.getProducts(this.pageNumber, this.pageSize,
      this.categIdSelected, this.subcategIdSelected, this.categGenderIdSelected).subscribe({
      next: response =>{
        this.products = response.result;
        if(response && response.pagination){
          console.log(response);
          this.products = response;
          this.pagination =  response.pagination;
        }
      }
    })
    if(this.categIdSelected == 0){
      this.loadSubcategories();
    }else{
      // var categName = this.categoryService.getCategoryById(this.categIdSelected);
      // if(this.categIdSelected == )
      // this.isHomeCateg = 
      this.categoryService.getSubcategoriesByCategorySelected(this.categIdSelected).subscribe({
        next:response=> this.subcategories = [{id:0, name:'All',productCategoryId:0}, ...response],
        error:error=> console.log(error)
      })
    }

  }
  getCategories(){
      this.productService.getCategories().subscribe({
        next:response=> this.categories = [{id:0, name:'All'}, ...response],
        error:error=> console.log(error)
      })
  }

  getSubcategories(){
    this.productService.getSubcategories().subscribe({
      next:response=> this.subcategories = [{id:0, name:'All',productCategoryId:0}, ...response],
      error:error=> console.log(error)
    })
  }

  getCategoryGenders(){
    this.productService.getCategoryGenders().subscribe({
      next:response=> this.categoryGenders = [{id:0, name:'All'}, ...response],
      error:error=> console.log(error)
    })
  }

  onCategorySelected(categId:number){
    this.isPromoPage = false;
    this.categIdSelected = categId;
    this.loadProducts();
  }
  onSubcategorySelected(subcategId:number){
    this.isPromoPage = false;
    this.subcategIdSelected = subcategId;
    this.loadProducts();
  }

  onCategoryGenderSelected(categGenderId:number){
    this.isPromoPage = false;
    this.categGenderIdSelected = categGenderId;
    this.loadProducts();
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
  
  loadSubcategories(){
    this.categoryService.getSubcategories().subscribe({
      next:response=> {this.subcategories = response,
      console.log(this.subcategories)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get subcategories Request has completed')
    })
  }
  
  loadCategoryGenders(){
    this.categoryService.getCategoryGender().subscribe({
      next:response=> {this.categoryGenders = response,
      console.log(this.categoryGenders)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get categoryGenders Request has completed')
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
    this.isPromoPage = false;
    this.productService.getInStockProducts()
    .subscribe({next: response=>{this.products = response;
    }});
  }
  getPromotions(){
    this.isPromoPage = true;
    this.productService.getPromotions()
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
    this.isPromoPage = false;
    // this.router.navigateByUrl(this.baseUrl+'/products/categorizedProducts/'+categ);
    this.productService.getProductsBySelectedCategory(categ).subscribe({
      next: response => {this.products = response;
      }
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


  
}
