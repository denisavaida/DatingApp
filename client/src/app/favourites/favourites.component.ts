import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { FavouritesService } from '../_services/favourites.service';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  favourites:any={};
  product:any = {};

  constructor(private favouritesService: FavouritesService, private router:Router, private cartService:CartService, private toastr: ToastrService){
    this.favourites = this.favouritesService.getItems();
  }

  addToShoppingCart(prod:Product){
    var prods = this.cartService.getItems();
    if(prods.length == 0){
      // prod.quantity = prod.quantity + 1;
      prod.subtotal = prod.price * prod.quantity;
      this.cartService.addToCart(prod);
  
    }else {
      if(this.cartService.findItem(prod)){
        this.cartService.setItem(prod);
        return;
      }else{
        prod.quantity = prod.quantity + 1;
        this.cartService.addToCart(prod);
        return;
      }
     }
   
    this.toastr.success('your product has been added to the cart!');
  }
  deleteProduct(id: any){
    this.favouritesService.deleteItem(id);
    this.toastr.warning("Product deleted from favourites list!");
  }
  back(){
    this.router.navigateByUrl('/products');
  }
}
