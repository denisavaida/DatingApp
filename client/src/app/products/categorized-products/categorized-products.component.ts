import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { Product } from 'src/app/_models/product';
import { Subcategory } from 'src/app/_models/subcategory';
import { AccountService } from 'src/app/_services/account.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-categorized-products',
  templateUrl: './categorized-products.component.html',
  styleUrls: ['./categorized-products.component.css']
})
export class CategorizedProductsComponent implements OnInit{
  currentUser:any = {};
  products: any=[];
  minPrice: any;
  maxPrice: any;
  startValue:any = 0;
  endValue: any = 500;
  categories:any;
  searchItem:string = ''
  subcategories: Subcategory[]=[]
  subcategIdSelected = 0;
  categSelected:Category={
    id: 0,
    name: ''
  }
  constructor( private productService: ProductService,private route: ActivatedRoute, private bcService:BreadcrumbService, 
    private accountService: AccountService,private categoryService:CategoryService){  
   this.accountService.currentUser$.pipe((take(1))).subscribe({
   next: user=> this.currentUser = user
    })
        }
    ngOnInit(): void {
      // this.route.params.subscribe({next: value => {console.log(value);
          
      // }});
      this.loadProductsWithSelectedCategory();
      // this.loadCategories();
      this.getSubcategoriesOfCategory();
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
    loadProductsWithSelectedCategory(){
      var categ = this.route.snapshot.paramMap.get('category');
      if(!categ) return;
      console.log(categ);
      this.bcService.set('@categorized', categ);
      this.productService.getProductsBySelectedCategory(categ).subscribe({
        next: products => {
          this.products = products;
          
          console.log(this.products);
        
        }
      })
  
    }
    getSubcategoriesOfCategory(){
      var categ = this.route.snapshot.paramMap.get('category');
      if(!categ) return;
      console.log(categ);
      this.categoryService.getCategoryByName(categ).subscribe({next:response=>{this.categSelected = response
        console.log(this.categSelected)}})
        if(this.categSelected){
          this.categoryService.getSubcategoriesByCategorySelected(this.categSelected.id).subscribe({
            next:response=> {this.subcategories = [{id:0, name:'All',productCategoryId:0}, ...response]
          console.log(this.subcategories)},
            error:error=> console.log(error)
          })
        }
  
    }
    onSubcategorySelected(id:number){}
    sliderValueChanged(){ 
      this.productService.getRangeProducts(this.startValue, this.endValue)
      .subscribe({next: response=>this.products = response});
    }
    inStockProducts(){
      this.productService.getInStockProducts()
      .subscribe({next: response=>this.products = response});
    }
    sortAscending(){}
    sortDescending(){}
    sortBiggestDiscount(){}
    sortPopular(){}
    search(){}
    addToCart(prod:Product){}
    addToFavourites(prod:Product){}
    deleteProduct(prod:Product){}
}