import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map,take } from 'rxjs';
import { Product } from '../_models/product';
import { ShoppingCart } from '../_models/shopping-cart';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  private currentProductSource= new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProductSource.asObservable();

  shoppingCart:any={}
  prod:any={}
  products:any={}
  currentUser:any;
  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.getProducts();
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.currentUser = user
    });
  }

  getProducts(){
    return  this.http.get(this.baseUrl+'products').subscribe({
      next:response=> {this.products = response,
      console.log(response),
    this.validateProds(this.products)},
      error:error=>console.log(error),
      complete:()=> console.log(' get products Request has completed')
    })
  }

  validateProds(prods: Product[]){
    for( var i=0; i< prods.length; i++){
      if(prods[i].stock == 0){
        prods.push(prods[i])
        prods.splice(i,1);
      }
    }
}
  getProductById(id:any){
    return this.http.get<Product>(this.baseUrl+'products/'+ id);
  }

  getProductDetails(name:string){
    this.prod = this.currentProduct$.pipe(
      map(product =>{
        if ( product){
          if(product.name == name){
            this.currentProductSource.next(product);
          }
          
        }
        return product;
      })
    )
    return this.http.get<Product>(this.baseUrl + 'products/'+ this.prod.name)
  }

  makeOrder(model:any){
    return this.http.post<Product>(this.baseUrl + 'products/order',model).pipe(
        map(product=>{
          if(product){
            // localStorage.setItem('product',JSON.stringify(product));
            this.currentProductSource.next(product);
          }
          return product;
        })
      )
    }
    addToStock(model:Product){
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
    updateProduct(prod: Product){
      return this.http.put<Product>(this.baseUrl + 'products/update',prod).pipe(
        map(product=>{
          if(product){
            localStorage.setItem('updatedProduct',JSON.stringify(product));
            console.log("Product is: "+product);
            this.currentProductSource.next(product);
          }
          return product;
        })
      )
    }

    // addShoppingCart(model:ShoppingCart){
    //   // model.userId = this.currentUser.id;
    //   console.log("model is : " + model);
    //   return this.http.post<ShoppingCart>(this.baseUrl + 'shoppingCart/add',model).pipe(
    //     map(shoppingCart=>{
          
    //       localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart));
    //       this.currentShoppingCartSource.next(shoppingCart);
    //     })
    //   )
    // }
    getShoppingCart(id: any){
      this.http.get(this.baseUrl+'shoppingCart/'+id).subscribe({
        next:response=> this.shoppingCart = response,
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')
      })
    }
  
    
    setCurrentProduct(product: Product){
      this.currentProductSource.next(product);
    }

    logout(){
      localStorage.removeItem('product');
    }
}
