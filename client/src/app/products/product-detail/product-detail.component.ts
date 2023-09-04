import { HttpClient } from '@angular/common/http';
import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
product:any={};

constructor( private productService: ProductService,private router: Router, private toastr: ToastrService){}
ngOnInit():void{
  this.productService.getProducts();
}


showDetails(){
  this.productService.getProductDetails(this.product.id).subscribe({
    next:response=>{
      this.router.navigateByUrl('/products')
      console.log(response);
      this.cancel;
    },
    error:error=>{
      this.toastr.error(error.error);
      console.log(error);
    }
  })
  
}

cancel(){}
}
//doesn't work!!