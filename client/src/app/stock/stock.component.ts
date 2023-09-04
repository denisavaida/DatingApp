import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{
  @Output() cancelAddingStock = new EventEmitter();
  model:any={}

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {}

  addProduct(){
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

  cancel(){}

}
