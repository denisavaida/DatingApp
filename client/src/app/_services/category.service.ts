import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../_models/product";
import { Category } from "../_models/category";
import { Subcategory } from "../_models/subcategory";
import { CategoryGender } from "../_models/category-gender";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    categories:any = {}
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { 
  }
  

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl+'category');
  }
  getCategoryByName(categ:string){
    return this.http.get<Category>(this.baseUrl+'category/' + categ);
  }
  // getProductsBySelectedCategory(categ:string){
  //   return this.http.get<Product[]>(this.baseUrl +'category/' + categ);
  // }
  getSubcategories(){
    return this.http.get<Subcategory[]>(this.baseUrl+'subcategory');
  }
  getCategoryGender(){
    return this.http.get<CategoryGender[]>(this.baseUrl+'categoryGender');
  }
  getSubcategoriesByCategorySelected(categoryId:number){
    return this.http.get<Subcategory[]>(this.baseUrl + 'subcategory/'+categoryId);
  }
  addCategory(model: Category){
    return this.http.post<Category>(this.baseUrl + 'category/add',model).pipe(
      map(categ=>{
        if(categ){
          localStorage.setItem('category',JSON.stringify(categ));
        }
        return categ;
      })
    )
  }
  addSubcategory(model: Subcategory){
    return this.http.post<Subcategory>(this.baseUrl + 'subcategory/add',model).pipe(
      map(categ=>{
        if(categ){
          localStorage.setItem('subcategory',JSON.stringify(categ));
        }
        return categ;
      })
    )
  }
  addCategoryGender(model: CategoryGender){
    return this.http.post<CategoryGender>(this.baseUrl + 'categoryGender/add',model).pipe(
      map(categ=>{
        if(categ){
          localStorage.setItem('categoryGender',JSON.stringify(categ));
        }
        return categ;
      })
    )
  }
  updateCategory(categ: Category){
    return this.http.put<Category>(this.baseUrl+'category/update',categ).pipe(
      map(category=>{
        if(category){
          localStorage.setItem('category',JSON.stringify(category));
          console.log("Category is: "+category);
        }
      })
    )
  }
  updateSubcategory(model: Subcategory){
    return this.http.put<Subcategory>(this.baseUrl+'subcategory/update',model).pipe(
      map(category=>{
        if(category){
          localStorage.setItem('subcategory',JSON.stringify(category));
          console.log("Subcategory is: "+category);
        }
      })
    )
  }
  updateCategoryGender(model: CategoryGender){
    return this.http.put<CategoryGender>(this.baseUrl+'categoryGender/update',model).pipe(
      map(category=>{
        if(category){
          localStorage.setItem('category',JSON.stringify(category));
          console.log("Category gender is: "+category);
        }
      })
    )
  }
  deleteCategory(categ: Category){
    return this.http.delete<Category>(this.baseUrl+'category/delete/'+categ.id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
  deleteSubcategory(categ: Subcategory){
    return this.http.delete<Category>(this.baseUrl+'subcategory/delete/'+categ.id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
  deleteCategoryGender(categ: CategoryGender){
    return this.http.delete<Category>(this.baseUrl+'categoryGender/delete/'+categ.id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
}
