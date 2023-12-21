import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PaginatedResult } from "../_models/pagination";
import { Product } from "../_models/product";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AccountService } from "./account.service";
import { map, take } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PromotionService {
  
    baseUrl = environment.apiUrl;
    currentUser:any;
    products:any={}
    paginatedResult : PaginatedResult<Product[]> = new PaginatedResult<Product[]>;

    constructor(private http: HttpClient, private accountService: AccountService) { 
        this.getProducts();
        this.accountService.currentUser$.pipe((take(1))).subscribe({
          next: user=> this.currentUser = user
        });
    }
    getProducts(page?:number, itemsPerPage ?:number){
        let params = new HttpParams();
        if(page && itemsPerPage){
          params = params.append('pageNumber',page);
          params = params.append('pageSize', itemsPerPage);
        }
    
        return  this.http.get(this.baseUrl+'promotions', {observe: 'response', params}).pipe(
          map(response=>{
           
            if(response.body){
              
              this.paginatedResult = response.body;
            }
            const pagination = response.headers.get('Pagination');
            if(pagination){
              this.paginatedResult.pagination = JSON.parse(pagination);
            }
            return this.paginatedResult;
          })
        )
      }
      
}