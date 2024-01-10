import { HttpClient } from "@angular/common/http";
import { Product } from "../_models/product";
import { Favourites } from "../_models/favourite";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { AccountService } from "./account.service";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
  })
export class FavouritesService{
    items: Product[] = [];
    baseUrl = environment.apiUrl;
    favourites: Favourites= {
        products: [],
        AppUserId: 0,
        ProductId: 0
    };
    prod:any={}
    favs : any={}

    constructor(private http: HttpClient, private toastr:ToastrService,private accountService:AccountService,private productService: ProductService){
      this.favs = this.accountService.getFavourites();
     }

    addToFavourites(AppUserId: number, prod: Product){
        this.items.push(prod);
        this.favourites.AppUserId = AppUserId;
        this.favourites.ProductId = prod.id;
        this.favourites.products.push(prod);
        
        return this.http.post<Favourites>(this.baseUrl + 'favourites/add',this.favourites).subscribe({
            next:response=>{
              this.toastr.success("Favourites added to db!")
              console.log(response);
              return response;
            },
            error:error=>{
              this.toastr.error(error.error)
              console.log(error)
            }
          }) 
    }
    getUsersFavItems(){
      this.favs = this.accountService.getFavourites();
      this.items = []
      if(this.favs.length != 0){
        for(var i = 0; i< this.favs.length; i++){
          this.productService.getProductById(this.favs[i].productId).subscribe({next: response => {this.prod = response;
            // this.favs.products(this.prod);
            this.items.push(this.prod);
          }});
        };   
      }
    return this.items;
    }

    getItems(){
        return this.favs.products;
    }

    itemsCount(){
        return this.favs.length;
    }

    clearFavourites(){
        this.items = this.getUsersFavItems();
        this.items.forEach(element => {
          this.deleteItem(element);
        });
        return this.items;
    }

    deleteItem(id: any){
        for( var i=0; i< this.items.length; i++){
            if(this.items[i].id == id){
                this.items.splice(i,1);
            }
        }
        return this.http.delete<Favourites>(this.baseUrl+'favourites/delete/'+id).subscribe(
          data => {
          console.log(data);
      });
    }

    findItem(prod:Product){
        var flag = false; 
        this.items = this.accountService.getFavourites();
        this.items.forEach(element => {
            if(element.id == prod.id){
              flag = true;  
              return flag;
            }
            else{
              return flag;
          }
        });
        console.log(flag);
        return flag;
    }
}