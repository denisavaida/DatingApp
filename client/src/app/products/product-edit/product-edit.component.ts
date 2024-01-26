import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { CategoryGender } from 'src/app/_models/category-gender';
import { Product } from 'src/app/_models/product';
import { Subcategory } from 'src/app/_models/subcategory';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { AddPhotosComponent } from '../add-photos/add-photos.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  model: Product = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    category: {
      id: 0,
      name: ''
    },
    categoryGender:{
      id: 0,
      name: ''
    },
    subcategory:{
      id: 0,
      name: '',
      productCategoryId: 0
    },
    oldPrice: 0,
    price: 0,
    image: '',
    stock: 0,
    images: [],
    discount: 0,
    softDeleted: false,
    rating: 0
  };
  categoriesDB: Category[] = []
  subcategoriesDB:Subcategory[] = []
  categoryGendersDB:CategoryGender[] = []

  selectedCategory: Category = {
    id: 0,
    name: ''
  }
  selectedSubcategory:Subcategory = {
    id: 0,
    name: '',
    productCategoryId: 0
  }
  selectedCategoryGender:CategoryGender = {
    id: 0,
    name: ''
  }

  constructor(private productService:ProductService, private route: ActivatedRoute, private router: Router,
    private categoryService:CategoryService,private bcService:BreadcrumbService){
  }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategories();
    this.loadSubcategories();
    this.loadCategoryGenders();
  }
  
  loadProduct(){
    var id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.productService.getProductById(id).subscribe({
      next: product => {
        console.log(product);
        this.model = product;
        this.bcService.set('@edit', 'Edit - '+this.model.name);
        console.log(this.model);
        this.selectedCategory = this.model.category;
        this.selectedSubcategory = this.model.subcategory;
        this.selectedCategoryGender = this.model.categoryGender;
      }
    })
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
    
    console.log(this.selectedCategory);
    // if(this.selectedCategory.id !=0){
    //   this.categoryService.getSubcategoriesByCategorySelected(this.selectedCategory.id).subscribe({
    //     next:response=> {this.subcategoriesDB = response,
    //     console.log(this.subcategoriesDB)
    //     },
    //     error:error=>console.log(error),
    //     complete:()=> console.log('get selected subcategories Request has completed')
    //   })
     
    // }else{
      this.categoryService.getSubcategories().subscribe({
        next:response=> {this.subcategoriesDB = response,
        console.log(this.subcategoriesDB)
        },
        error:error=>console.log(error),
        complete:()=> console.log('get subcategories Request has completed')
      })
    // }
   
    
  }
  loadCategoryGenders(){
    this.categoryService.getCategoryGender().subscribe({
      next:response=> {this.categoryGendersDB = response,
      console.log(this.categoryGendersDB)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get categoryGenders Request has completed')
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
  updateProduct(){
    this.model.category = this.selectedCategory;
    this.model.subcategory = this.selectedSubcategory;
    this.model.categoryGender = this.selectedCategoryGender;
    console.log(this.model.category.name); 
    console.log(this.model.category.id); 

    if(this.model.discount == 0){
      if(this.model.oldPrice != this.model.price){
        this.model.price = this.model.oldPrice;
      }
    }else{
      var price = this.model.oldPrice - this.model.oldPrice * this.model.discount / 100;
      this.model.price = price;
    }
    this.model.subcategory.productCategoryId = this.model.category.id;
    console.log(this.model);
    this.productService.updateProduct(this.model).subscribe();
    // this.router.navigateByUrl('/products');
  }
  delete(){
    console.log(this.model);
    this.model.softDeleted = true;
    this.productService.updateProduct(this.model);
    this.router.navigateByUrl('/products');
  }
  
  cancel(){
    window.history.back();
  }
}
