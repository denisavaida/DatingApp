import { Component } from '@angular/core';
import { User } from '../_models/user';
import { ShoppingCart } from '../_models/shopping-cart';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  user:any={};
  model:any={};

  constructor(private productService: ProductService, private accountService:AccountService, private toastr: ToastrService, private router: Router){
    
  }
  sendOrder(shoppingcart: ShoppingCart, user: User){
    this.user = this.accountService.getUser(this.model.id);
    
    this.productService.makeOrder(shoppingcart).subscribe({
      next: response=>{
        this.router.navigateByUrl('/products')
        this.toastr.success("Order completed")
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
