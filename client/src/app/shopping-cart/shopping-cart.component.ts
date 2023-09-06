import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  model:any={};
  constructor(private productService: ProductService, private router: Router,private toastr:ToastrService){}

  addProductToShoppingCart(){
    this.productService.addToShoppingCart(this.model).subscribe({
      next:response=>{
        this.router.navigateByUrl('/products')
        this.toastr.success("Item added to stock")
        console.log(response);
        this.cancel;
      },
      error:error=>{
        this.toastr.error(error.error)
        console.log(error)
      }
    })
  }

  cancel(){}
}
