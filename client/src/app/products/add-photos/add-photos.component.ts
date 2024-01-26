import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/_models/photo';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit{
  product: Product = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
    category: {
      id: 0,
      name: ''
    },
    categoryGender: {
      id: 0,
      name: ''
    },
    subcategory: {
      id: 0,
      name: '',
      productCategoryId: 0
    },
    oldPrice: 0,
    price: 0,
    image: '',
    stock: 0,
    images: [],
    discount: 0,
    softDeleted: false,
    rating: 0
  }
 photo: Photo = {
   id: 0,
   url: '',
   isMain: false,
   productId: 0
 }

 productId: number= 0;
  constructor(private route:ActivatedRoute, private productService:ProductService, 
    private toastr:ToastrService, private bcService:BreadcrumbService,){
      // this.productId= data.id;
      // , @Inject(MAT_DIALOG_DATA) public data:any
  }

  ngOnInit(): void {
    this.loadProduct();
  }


  loadProduct(){
    var id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@add-photos', 'Photos - ' + this.product.name);
        console.log(this.product);
        if(this.product.stock > 0){
          this.product.quantity = 1;
        }
        else{
          this.product.quantity = 0;
        }
        
      }
    })
    return this.product;
  }
  addPhoto(){
    this.photo.productId = this.product.id;
    this.productService.addPhotoOfProduct(this.photo).subscribe({
      next:response=>{
        this.toastr.success("Photo added to photos list")
        console.log(response);
        this.cancel();
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }
  cancel(){
    window.history.back();
  }
}
