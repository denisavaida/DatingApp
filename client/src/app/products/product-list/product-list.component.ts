import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: any={};

  constructor(private http: HttpClient,private productService: ProductService){ }

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(){
    this.http.get('https://localhost:5001/api/products').subscribe({
      next:response=> this.products = response,
      error:error=>console.log(error),
      complete:()=> console.log('Request has completed')
    })
  }
  addToShoppingCart(product: Product){
    console.log("Added to shopping cart ! ");
  }

  addToFavourites(product: Product){
    console.log("Added to favourites ! ");
  }

  
}
