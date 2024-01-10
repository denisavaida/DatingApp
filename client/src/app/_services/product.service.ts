import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map,take } from 'rxjs';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  private currentProductSource= new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProductSource.asObservable();

  paginatedResult : PaginatedResult<Product[]> = new PaginatedResult<Product[]>;
  shoppingCart:any={}
  prod:any={}
  products:any={}
  currentUser:any;
  outOfStockProds: Product[] = [];
  searchItem:string = '';
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

    return  this.http.get(this.baseUrl+'products', {observe: 'response', params}).pipe(
      map(response=>{
        
        if(response.body){
        
          this.paginatedResult = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        console.log(this.paginatedResult);
        return this.paginatedResult;
      })
    )
  }

  getSearchProducts(searchItem:string){
   return this.http.get<Product[]>(this.baseUrl+'products/search/'+ searchItem);
  }
  getPopularProducts(){
    return this.http.get<Product[]>(this.baseUrl+'products');
  }
  getProductsBySelectedCategory(categ:string){
    console.log(categ);
    return this.http.get<Product[]>(this.baseUrl +'products/category/' + categ);
  }
  getRangeProducts(minPrice: number, maxPrice: number){
    return this.http.get<Product[]>(this.baseUrl+'products/range/'+ minPrice +"/"+maxPrice);

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
  getSortedProds(type: string){
    return this.http.get<Product[]>(this.baseUrl + 'products/sort/'+type);
  }

  getInStockProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products/instock');
  }
  makeOrder(model:any){
    return this.http.post<Product>(this.baseUrl + 'products/order',model).pipe(
        map(product=>{
          if(product){
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

    getShoppingCart(id: any){
      this.http.get(this.baseUrl+'shoppingCart/'+id).subscribe({
        next:response=> this.shoppingCart = response,
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')
      })
    }
  
    // deleteProduct(prod:Product){
    //   this.http.delete<Product>(this.baseUrl+"favourites/delete/"+ prod.id);
    // }
    setCurrentProduct(product: Product){
      this.currentProductSource.next(product);
    }

    logout(){
      localStorage.removeItem('product');
    }
}
