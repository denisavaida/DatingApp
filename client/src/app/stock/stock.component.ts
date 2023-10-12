import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_models/product';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { ShoppingCart } from '../_models/shopping-cart';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{
  @Output() cancelAddingStock = new EventEmitter();
  model: any = {};
  loggedUser : User| null = null;
  shoppingCart: any = {}

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService, private accountService: AccountService){
    this.accountService.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
  }

  ngOnInit(): void {}

  addProduct(){
    if(this.loggedUser){
      if(this.shoppingCart){
        if(this.shoppingCart.userId == this.loggedUser.id){
        
        }
        else{
          this.shoppingCart.userId = this.loggedUser.id;
          this.model.shoppingCartId = this.shoppingCart.id;
        }
      }
  
    }
    
    this.productService.addToStock(this.model).subscribe({
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

  // getPrice(oldPrice: number, discount: number){
  //   var price;
  //   if (discount == 0){
  //     price = oldPrice;
  //   }else{
  //     price = oldPrice - oldPrice * discount / 100 ;
  //   }
  //   console.log("price is: "+price);
  //   return price;
  // }
  
  cancel(){
    this.router.navigateByUrl('/products');
  }

}
