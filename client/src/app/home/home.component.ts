import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  registerMode = false;
  users: any;
  popularProds: Product[] = []
  sortingType:string = ''
  images = [
    
    {title: 'Jucarii pentru toata lumea', short: 'Te ajutam sa alegi jucarii pentru copilul tau!', src: "../../assets/toys3.png", category:"jocuri si jucarii"},
    {title: 'Arunca o privire', short: 'Gaseste articole pentru bebelusul tau!', src: "../../assets/gifts.png", category:"mama si copilul"},
    {title: 'Verifica', short: 'Tinute pentru toti copiii !', src: "../../assets/dresses.png", category:"imbracaminte"},
    {title: 'Pantofi comozi', short: 'Incaltati-va comod!', src: "../../assets/shoes.jpg", category:"incaltaminte"},
    {title: 'Casa si gradina', short: 'Idei de decor pentru gradina ta !', src: "../../assets/garden.jpg", category:"casa si gradina"}
  ];
  constructor(private router: Router,private http: HttpClient, private accountService: AccountService, private productService:ProductService){
    

  }

  ngOnInit(): void {this.accountService.getUsers();
    this.getPopularProducts();
    console.log(this.popularProds);
  }

  getPopularProducts(){
    this.sortingType = 'popular';
    this.productService.getSortedProds(this.sortingType)
    .subscribe({next: response=>{this.popularProds = response;    
      console.log(this.popularProds);

   }});
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('get users homepage Request has completed')

    })
  }
  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  // guestMode(){
  //   this.router.navigateByUrl('/products')
  // }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
