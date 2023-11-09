import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { User } from '../_models/user';
import { Adress } from '../_models/adress';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../_models/shopping-cart';
import { Favourites } from '../_models/favourite';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource= new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  user: any;
  adress:any;
  adressToDisplay:any;
  users:any;
  shoppingCart:ShoppingCart = {
    quantity: 0,
    subtotal: 0,
    AppUserId: 0,
    productId: 0,
    id: 0,
    product: {}
  };
  dbCart:any={};
  favs:any={};
  favourites:Favourites = {
    products: [],
    AppUserId: 0,
    ProductId: 0
  }
  loggedUser: any;
  isAuthenticated = false;

  constructor(private http: HttpClient) { 
    
  }

  getUsers(){
    this.users = this.http.get(this.baseUrl+'users');
    return this.users;
  }

  getUser(id: any){
    this.user = this.currentUser$.pipe(
      map(useer =>{
        if ( useer?.id == id){
          this.currentUserSource.next(useer);
        }
        return useer;
      })
    )
    return this.http.get<User>(this.baseUrl + 'users/'+ this.user.id);

  }
   
  getAdress(id:any){
    this.adress = this.currentUser$.pipe(map(adress=>{
      if(adress?.id == id){
        this.currentUserSource.next(adress);
      }
      return adress;
    }))
    return this.http.get<Adress>(this.baseUrl+'adresses/'+this.user.id);
  }

  getShoppingCart(){
    this.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
    if(this.loggedUser){
      this.getShoppingCartById(this.loggedUser.id).subscribe({
        next:response=> {this.dbCart = response
        console.log(this.dbCart);
        },
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')});
        
    
       
        // this.http.get(this.baseUrl+'shoppingCart/'+ this.shoppingCart.AppUserId).subscribe({
        //   next:response=> cart = response,
        //   error:error=>console.log(error),
        //   complete:()=> console.log('get shopping cart Request has completed')})

    }else{
      this.dbCart = this.shoppingCart;
      
    }
    return this.dbCart;
      
  }
  
  getFavourites(){
    this.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
    if(this.loggedUser){
      this.getFavouritesById(this.loggedUser.id).subscribe({
        next:response=> {this.favs = response
        console.log(this.favs);
        },
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')});
        
    
       
        // this.http.get(this.baseUrl+'shoppingCart/'+ this.shoppingCart.AppUserId).subscribe({
        //   next:response=> cart = response,
        //   error:error=>console.log(error),
        //   complete:()=> console.log('get shopping cart Request has completed')})

    }else{
      this.favs = this.favourites;
      
    }
    return this.favs;
      
  }
  getFavouritesById(id:number){
    return this.http.get(this.baseUrl+'favourites/'+ id);
  }
  getShoppingCartById(id: number){
    return this.http.get(this.baseUrl+'shoppingCart/'+ id);
  }
  
  login(model:any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User)=>{
        this.user = response;
        if(this.user){
        localStorage.setItem('user', JSON.stringify(this.user));
        
        console.log(this.user.username +' is logged in');
        this.currentUserSource.next(this.user);
        this.isAuthenticated = true;
        console.log(this.isAuthenticated + ' authentication');
      }
    })
  )
}

  loadUser(){
    if(this.isAuthenticated){
      this.currentUser$.pipe((take(1))).subscribe({
        next: user=>{ this.user = user;
          console.log(this.user);
       }
      })
    }else{
      console.log('you re not logged in !')
    }

    // this.user = {
    //   username: this.currentUser$.pipe(map(u=>u?.username == this.user.username)),
    //   role: this.currentUser$.pipe(map(u=>u?.role == this.user.role))
    // }
    
    return this.user;
  }

  loadAdress(adress: Adress){
    this.adressToDisplay ={
      street: adress.street,
      number: adress.number,
      city: adress.city,
      region: adress.region,
      country: adress.country,
      userId: adress.userId
    }
    
    console.log("this is the output adresss : "+this.adressToDisplay);
    return this.adressToDisplay;
  }
  register(model:any){
    this.shoppingCart.AppUserId = model.id;
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
        map(user=>{
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          return user;
        })
      )
    }

  addAdressRegister(model:Adress){
    return this.http.post<Adress>(this.baseUrl + 'account/addAdress',model).pipe(
      map(adress=>{
        if(adress){
          localStorage.setItem('adress',JSON.stringify(adress));
        }
        return adress;
      })
    )
  }
  // addShoppingCart(cart: ShoppingCart){
  //   return this.http.post<ShoppingCart>(this.baseUrl + 'shoppingCart/add',cart).pipe(
  //     map(cart=>{
  //       if(cart){
  //         localStorage.setItem('cart',JSON.stringify(cart));
  //       }
  //       return cart;
  //     })
  //   )
  // }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  getCurrentUser(){
    this.currentUser$.pipe((take(1))).subscribe({
        next: user=> this.user = user
      })
    
    this.http.get<User>(this.baseUrl + 'users/'+ this.user.id).subscribe({
      next: response=> {this.loggedUser = response,
      console.log("this is the current user:" + this.loggedUser)},
      error: error=> console.log(error)
    });
    return this.loggedUser;
  }

  logout(){
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
