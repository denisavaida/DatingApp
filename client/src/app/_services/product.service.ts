import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map,take } from 'rxjs';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { PaginatedResult } from '../_models/pagination';
import { Category } from '../_models/category';
import { Subcategory } from '../_models/subcategory';
import { CategoryGender } from '../_models/category-gender';
import { Photo } from '../_models/photo';

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

  getProducts(page?:number, itemsPerPage ?:number, categId?: number, subcategId?:number,categGId?:number){
    let params = new HttpParams();
    if(page && itemsPerPage){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }
    if(categId){
      params = params.append('CategoryId',categId);
    }    
    if(subcategId){
      params = params.append('SubcategoryId',subcategId);
    }
    if(categGId){
      params = params.append('CategoryGenderId',categGId);
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
  getCategories(){
    return this.http.get<Category[]>(this.baseUrl+'category');
  }
  getSubcategories(){
    return this.http.get<Subcategory[]>(this.baseUrl+'subcategory');
  }
  getCategoryGenders(){
    return this.http.get<CategoryGender[]>(this.baseUrl+'categoryGender');
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
  getPromotions(){
    return this.http.get<Product[]>(this.baseUrl + 'products/promotions');
  }
  getPhotosOfProductId(id: number){
    return this.http.get<Photo[]>(this.baseUrl+'products/photos/'+id);
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

    addPhotoOfProduct(photo:Photo ){
      return this.http.post<Photo>(this.baseUrl+ 'products/add-photo',photo).pipe(
        map(photo=>{
          if(photo){
            localStorage.setItem('photo',JSON.stringify(photo));
          }
          return photo;
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
  
    deleteProduct(prod:Product){
      this.http.delete<Product>(this.baseUrl+"products/delete/"+ prod.id);
    }
    setCurrentProduct(product: Product){
      this.currentProductSource.next(product);
    }

    logout(){
      localStorage.removeItem('product');
    }
}
