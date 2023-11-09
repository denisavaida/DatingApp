import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  //products: any={};
  model: Product = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    category: '',
    oldPrice: 0,
    price: 0,
    image: '',
    stock: 0,
    images: [],
    discount: 0,
    shoppingCartId: 0,
    isDeleted: false
  };

  constructor(private http:HttpClient,private productService:ProductService,private toastr:ToastrService, private route: ActivatedRoute, private router: Router){

    //this.products = this.productService.getProducts();
    
  }
  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct(){
    var id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.productService.getProductById(id).subscribe({
      next: product => {
        this.model = product;
      }
    })
  }
  updateProduct(){
    if(this.model.discount == 0){
      if(this.model.oldPrice != this.model.price){
        this.model.price = this.model.oldPrice;
      }
    }else{
      var price = this.model.oldPrice - this.model.oldPrice * this.model.discount / 100;
      this.model.price = price;
    }
    console.log(this.model);
    this.productService.updateProduct(this.model).subscribe();
    this.router.navigateByUrl('/products');
  }
  delete(){
    console.log(this.model);
    this.model.isDeleted = true;
    this.productService.updateProduct(this.model);
    this.router.navigateByUrl('/products');
  }
  cancel(){
    this.router.navigateByUrl('/products');
  }
}
