import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, take } from 'rxjs';
import { User } from '../_models/user';
import { Adress } from '../_models/adress';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../_models/shopping-cart';
import { Favourites } from '../_models/favourite';
import { SubscribeNewsletter } from '../_models/subscription';

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
    id: 0,
    product: {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      category: {
        id: 0,
        name: ''
      },
      oldPrice: 0,
      price: 0,
      image: '',
      stock: 0,
      images: [],
      discount: 0,
      softDeleted: false,
      rating: 0,
      categoryGender: {
        id: 0,
        name: ''
      },
      subcategory: {
        id: 0,
        name: '',
        productCategoryId: 0
      }
    },
    summary:{
      AppUserId: 0,
      productCost: 0,
      discounted: 0,
      total: 0,
      shoppingCartItems: [],
      voucherID: 0
    }
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
    this.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
  }

  getUsers(){
    this.users = this.http.get(this.baseUrl+'users');
    return this.users;
  }

  getUser(name: any){
    this.user = this.currentUser$.pipe(
      map(useer =>{
        if ( useer?.userName == name){
          this.currentUserSource.next(useer);
        }
        return useer;
      })
    )
    return this.http.get<User>(this.baseUrl + 'users/'+ this.user.username);

  }
  getUserByName(username: string){
    return this.http.get<User>(this.baseUrl+'users/'+ username).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }

  // getUserById(id: any){
  //   return this.http.get<User>(this.baseUrl+'users/'+ id).pipe(
  //     map(user=>{
  //       if(user){
  //         localStorage.setItem('user',JSON.stringify(user));
  //         this.currentUserSource.next(user);
  //       }
  //       return user;
  //     })
  //   );
  // }
  getAdress(id:any){
    return this.http.get<Adress>(this.baseUrl+'users/adress'+id);
  }

  getShoppingCart(){

    if(this.loggedUser){
      this.getShoppingCartById(this.loggedUser.id).subscribe({
        next:response=> {this.dbCart = response
        console.log(this.dbCart);
        },
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')});

    }else{
      this.dbCart = this.shoppingCart;
      
    }
    return this.dbCart;
      
  }
  getSummary(){
    this.currentUser$.pipe((take(1))).subscribe({
      next: user=> this.loggedUser = user
    })
    if(this.loggedUser){
      this.getSummaryById(this.loggedUser.id).subscribe({
        next:response=> {this.dbCart = response
        console.log(this.dbCart);
        },
        error:error=>console.log(error),
        complete:()=> console.log('get shopping cart Request has completed')});

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
  getSummaryById(id: number){
    return this.http.get(this.baseUrl+'summary/'+ id);
  }
  getSubscribers(){
    return this.http.get(this.baseUrl + 'users/subscribers');
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
      appUserId: adress.appUserId
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

  // addAdressRegister(model:Adress){
  //   return this.http.post<Adress>(this.baseUrl + 'account/addAdress',model).pipe(
  //     map(adress=>{
  //       if(adress){
  //         localStorage.setItem('adress',JSON.stringify(adress));
  //       }
  //       return adress;
  //     })
  //   )
  // }
  addSubscribtion(subscription:SubscribeNewsletter){

    console.log(subscription);
    return this.http.post<SubscribeNewsletter>(this.baseUrl+"users/subscribe",subscription);
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
  refreshData(){
    return new Observable((observer)=>{
      let i= 0;
      setInterval(()=>{
        i++;
        observer.next(i);
      },3000);
    })
  }

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
