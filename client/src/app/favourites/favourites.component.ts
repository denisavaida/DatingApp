import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  favourites:any={};
  product:any = {};

  constructor(private productService: ProductService){
    this.favourites = this.getFavourites();
  }

  getFavourites(){
    this.productService.getFavourites();
  }
  addToShoppingCart(product:Product){
    this.productService.addToShoppingCart(product);
  }

}
