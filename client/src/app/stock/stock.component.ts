import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_models/product';
import { AccountService } from '../_services/account.service';
import { Observable, take } from 'rxjs';
import { User } from '../_models/user';
import { ShoppingCart } from '../_models/shopping-cart';
import { CategoryService } from '../_services/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../_models/category';
import { Subcategory } from '../_models/subcategory';
import { CategoryGender } from '../_models/category-gender';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotosComponent } from '../products/add-photos/add-photos.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{
  @Output() cancelAddingStock = new EventEmitter();
  model: any = {};
  loggedUser : User| null = null;
  shoppingCart: any = {}

  categoriesDB: any = [];
  subcategoriesDB:any = [];
  categoryGendersDB:any = [];

  myControl = new FormControl();
  // categories = new FormControl();
  options: Observable<string[]> | undefined;
  category:any ={};
  selectedCategory: Category= {
    id: 0,
    name: ''
  };
  selectedSubcategory: Subcategory={
    id: 0,
    name: '',
    productCategoryId: 0
  };
  selectedCategoryGender: CategoryGender = {
    id: 0,
    name: ''
  };
  morePhotos:boolean = false;
  constructor(private productService: ProductService, private router: Router, 
    private toastr: ToastrService, private accountService: AccountService, 
    private categoryService: CategoryService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
  }

  ngOnInit(): void {
    // this.categories.setValue(['baby','christmas']);
    this.loadCategories();
    this.loadSubcategories();
    this.loadCategoryGenders();
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
  loadSubcategories(){
      this.categoryService.getSubcategories().subscribe({
        next:response=> {this.subcategoriesDB = response,
        console.log(this.subcategoriesDB)
        },
        error:error=>console.log(error),
        complete:()=> console.log('get subcategories Request has completed')
      })
  }
  loadCategoryGenders(){
    this.categoryService.getCategoryGender().subscribe({
      next:response=> {this.categoryGendersDB = response,
      console.log(this.categoryGendersDB)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get category genders Request has completed')
    })
    
  }
  change(selectedCategory:Category){
    if(this.selectedCategory.id !=0){
      this.categoryService.getSubcategoriesByCategorySelected(selectedCategory.id).subscribe({
        next:response=> {this.subcategoriesDB = response,
        console.log(this.subcategoriesDB)
        },
        error:error=>console.log(error),
        complete:()=> console.log('get subcategories Request has completed')
      })
    }
  }
  addProduct(){
    if(this.loggedUser){
      if(this.shoppingCart){
        if(this.shoppingCart.userId == this.loggedUser.id){
        
        }
        else{
          this.shoppingCart.userId = this.loggedUser.id;
          this.model.shoppingCartId = this.shoppingCart.id;
        }
      }
  
    }
    this.model.isDeleted = false;
    this.model.quantity = 1;
    this.model.category = this.selectedCategory;
    this.model.subcategory = this.selectedSubcategory;
    this.model.subcategory.productCategoryId = this.selectedCategory.id;
    this.model.categoryGender = this.selectedCategoryGender;
    
    console.log(this.model);
    // this.model.categories.push(this.selectedCategory);
    this.productService.addToStock(this.model).subscribe({
      next:response=>{
        this.router.navigateByUrl('/products')
        this.toastr.success("Item added to stock")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }

  // getPrice(oldPrice: number, discount: number){
  //   var price;
  //   if (discount == 0){
  //     price = oldPrice;
  //   }else{
  //     price = oldPrice - oldPrice * discount / 100 ;
  //   }
  //   console.log("price is: "+price);
  //   return price;
  // }
  wantMorePhotos(){
    this.morePhotos = true;
  }

  cancel(){
    this.router.navigateByUrl('/products');
  }

}
