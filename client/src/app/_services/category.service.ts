import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    categories:any = {}
  baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { 
      }
    

getCategories(){
    this.http.get(this.baseUrl+'productCategory/').subscribe({
      next:response=> this.categories = response,
      error:error=>console.log(error),
      complete:()=> console.log('get categories Request has completed')
    })
  }
}
