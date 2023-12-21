import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-categorized-products',
  templateUrl: './categorized-products.component.html',
  styleUrls: ['./categorized-products.component.css']
})
export class CategorizedProductsComponent implements OnInit{
  currentUser:any = {};
  products: Product[]=[];
  minPrice: any;
  maxPrice: any;
  constructor( private productService: ProductService,private route: ActivatedRoute, private toastr: ToastrService, 
    private accountService: AccountService){  
   this.accountService.currentUser$.pipe((take(1))).subscribe({
   next: user=> this.currentUser = user
    })
        }
    ngOnInit(): void {
      this.route.params.subscribe({next: value => {console.log(value);
          this.loadProductsWithSelectedCategory();
      }});
    }
 
    loadProductsWithSelectedCategory(){
      var categ = this.route.snapshot.paramMap.get('category');
      if(!categ) return;
      console.log(categ);
      this.productService.getProductsBySelectedCategory(categ).subscribe({
        next: products => {
          this.products = products;
          console.log(this.products);
        
        }
      })
    }

    addToCart(prod:Product){}
    addToFavourites(prod:Product){}
    deleteProduct(prod:Product){}
}