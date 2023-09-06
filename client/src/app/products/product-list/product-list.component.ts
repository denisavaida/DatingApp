import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: any={};
  baseUrl : string = 'https://localhost:5001/api/';
  product: any={};

  constructor(private http: HttpClient,private productService: ProductService, private toastr: ToastrService){ }

  ngOnInit(): void {
      this.products = this.getProducts();
  }

  getProducts(){
    this.http.get(this.baseUrl+'products').subscribe({
      next:response=> this.products = response,
      error:error=>console.log(error),
      complete:()=> console.log('Request has completed')
    })
  }
  addToShoppingCart(product: Product){
    this.product = this.productService.addToShoppingCart(product).subscribe({
      next:response=>{
        this.toastr.success("Item added to shopping cart")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
    
    console.log(this.product);
    console.log("Added to shopping cart ! ");
  }

  addToFavourites(product: Product){
    this.productService.addToFavourites(product);
    console.log("Added to favourites ! ");
  }

  
  cancel(){}
}
