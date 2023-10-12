import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { ShoppingCart } from '../_models/shopping-cart';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user:any={};
  model:any={};

  constructor(private cartService: CartService, private accountService:AccountService, private toastr: ToastrService, private router: Router, private route:ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.model = this.cartService.getShoppingCart();
  }
  
  loadShoppingCart(){
    // var id = this.route.snapshot.paramMap.get('id');
    // if(!id) return;
    // this.cartService.getShoppingCart(id).subscribe({
    //   next: cart => {
    //     this.model = cart;
    //   }
    // })
  }

  sendOrder(shoppingcart: ShoppingCart, user: User){
    this.user = this.accountService.getUser(this.model.id);
    
    // this.productService.makeOrder(shoppingcart).subscribe({
    //   next: response=>{
    //     this.router.navigateByUrl('/products')
    //     this.toastr.success("Order completed")
    //     console.log(response);
    //     this.cancel;
    //   },
    //   error:error=>{
    //     this.toastr.error(error.error)
    //     console.log(error)
    //   }
    // })
  }
  cancel(){
    this.router.navigateByUrl('/products');
  }
}
