import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { Subcategory } from '../_models/subcategory';
import { CategoryGender } from '../_models/category-gender';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generate-category',
  templateUrl: './generate-category.component.html',
  styleUrls: ['./generate-category.component.css']
})
export class GenerateCategoryComponent implements OnInit{
  categories: Category[] = []
  subcategories: Subcategory[] = []
  categoryGenders: CategoryGender[] = []
  modelC:any = {} ;
  modelS:any = {} ;
  modelG:any = {} ;
  constructor(private categoryService: CategoryService, private router: Router, private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
    this.loadCategoryGenders();
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
  addCategory(){
    this.categoryService.addCategory(this.modelC).subscribe({
      next:response=>{
        this.toastr.success("Item added to category db")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }
  addSubcategory(){
    this.categoryService.addSubcategory(this.modelS).subscribe({
      next:response=>{
        // this.router.navigateByUrl('/products')
        this.toastr.success("Item added to subcategory db")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }

  addCategoryGender(){
    this.categoryService.addCategoryGender(this.modelG).subscribe({
      next:response=>{
        // this.router.navigateByUrl('/products')
        this.toastr.success("Item added to category gender db")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }

  updateCategory(model:Category){
    this.categoryService.updateCategory(model).subscribe();
   }
   updateSubcategory(model: Subcategory){
      this.categoryService.updateSubcategory(model).subscribe();
   }
   updateCategoryGender(model: CategoryGender){
    this.categoryService.updateCategoryGender(model).subscribe();
 }
   deleteCategory(model:Category){
      this.categoryService.deleteCategory(model);
   }
   deleteSubcategory(model:Subcategory){
    this.categoryService.deleteSubcategory(model);
  }
  deleteCategoryGender(model:CategoryGender){
    this.categoryService.deleteCategoryGender(model);
  }
   
   radioButtonChange(data: MatRadioChange){
    console.log(data.value);
  }
   cancel(){
    this.router.navigateByUrl('/products');
   }
}
