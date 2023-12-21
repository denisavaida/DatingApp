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
  images = [
    {title: 'Christmas KIDS', short: 'Urmariti colectia de Craciun pentru copii!', src: "../../assets/Christmas.png", category:"christmas"},
    {title: 'Jucarii pentru toata lumea', short: 'Te ajutam sa alegi jucarii pentru copilul tau!', src: "../../assets/toys3.png", category:"toys"},
    {title: 'Activitati practice', short: 'Idei de activitati de facut cu copilul tau !', src: "../../assets/crafts.png", category:"crafts"},
    {title: 'Baby gift boxes', short: 'Gaseste o cutie cadou pentru bebelusi !', src: "../../assets/gifts.png", category:"baby"},
    {title: 'Verifica', short: 'Tinute pentru toti copiii !', src: "../../assets/dresses.png", category:"clothes"}
  ];
  constructor(private router: Router,private http: HttpClient, private accountService: AccountService, private productService:ProductService){
    this.getPopularProducts();
  }

  ngOnInit(): void {this.accountService.getUsers();
  }
  getPopularProducts(){
    this.productService.getPopularProducts().subscribe({
      next: response => {this.popularProds = response;
        console.log(this.popularProds);
      return this.popularProds},
      error:error => console.log(error),
      complete:()=>console.log('get popular products homepage Request has completed')
      
    })
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
