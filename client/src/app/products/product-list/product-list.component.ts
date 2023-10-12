import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  
 // @ViewChild(ProductListComponent)
  products: any={};
  baseUrl : string = 'https://localhost:5001/api/';
  product: any={};

  currentProduct$: Observable<Product | null> = of(null);

  constructor(private http: HttpClient,private productService: ProductService, private toastr: ToastrService){ }

  ngOnInit(): void {
      //this.products = this.getProducts();
  }

  getProducts(){
    this.http.get(this.baseUrl+'products').subscribe({
      next:response=> this.products = response,
      error:error=>console.log(error),
      complete:()=> console.log('get products Request has completed')
    })
  }

}
