import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../_models/product";
import { Category } from "../_models/category";

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

  getProductsBySelectedCategory(categ:string){
    return this.http.get<Product[]>(this.baseUrl +'category/' + categ);
  }

}
