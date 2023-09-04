import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl ='https://localhost:5001/api/';
  private currentProductSource= new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProductSource.asObservable();
  products:any={}
  prod:any={}
  constructor(private http: HttpClient) { }

  getProducts(){
    this.http.get(this.baseUrl+'products').subscribe({
      next:response=> this.products = response,
      error:error=>console.log(error),
      complete:()=> console.log('Request has completed')
    })
  }

  getProductDetails(id:any){
    this.prod = this.currentProduct$.pipe(
      map(product =>{
        if ( product?.id == id){
          this.currentProductSource.next(product);
        }
        return product;
      })
    )
    return this.http.get<Product>(this.baseUrl + 'products/'+ this.prod.id)
  }
  
  makeOrder(model:any){
    return this.http.post<Product>(this.baseUrl + 'product/order',model).pipe(
        map(product=>{
          if(product){
            // localStorage.setItem('product',JSON.stringify(product));
            this.currentProductSource.next(product);
          }
          return product;
        })
      )
    }
    addToStock(model:any){
      return this.http.post<Product>(this.baseUrl + 'stock/add',model).pipe(
          map(product=>{
            if(product){
              localStorage.setItem('product',JSON.stringify(product));
              this.currentProductSource.next(product);
            }
            return product;
          })
        )
      }
  setCurrentProduct(product: Product){
    this.currentProductSource.next(product);
  }

  logout(){
    localStorage.removeItem('product');
  }
}
