import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { SubscribeNewsletter } from './_models/subscription';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Category } from './_models/category';
import { CategoryService } from './_services/category.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Koala Kids Shop';
  user: any = {};
  currentUser: any ;
  // model:any={};
  subscribers: any= [];
  isSubscribed: boolean = false;
  categoriesDB : Category[]= []
  subscription: SubscribeNewsletter = {
    id: 0,
    email: ''
  }
  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  constructor(private http: HttpClient, private accountService: AccountService, public bcService:BreadcrumbService,
    private toastrService:ToastrService, private route:ActivatedRoute, private categoryService: CategoryService){

  }
  ngOnInit(): void {
    //this.getUsers();
    this.loadCategories();
    this.setCurrentUser();
    this.loadSubscribers();
    this.validateSubscription();
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => this.users = response,
  //     error: error => console.log(error),
  //     complete: () => console.log('Request has completed')

  //   })
  // }
  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:response=> {this.categoriesDB = response,
      console.log(this.categoriesDB)
      },
      error:error=>console.log(error),
      complete:()=> console.log('get categories Request has completed')
    })
  }
  loadSubscribers(){
    this.accountService.getSubscribers().subscribe({
      next: subscribers => {
        this.subscribers = subscribers;
        this.subscribers.forEach((element: { email: any; }) => {
          if(this.user.userName ==element.email){
            this.isSubscribed = true;
          }
        });
        console.log(this.subscribers);
      }
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    this.user= JSON.parse(userString);
    this.accountService.setCurrentUser(this.user);
  }

  subscribeNews(){
    console.log(this.subscription);
    // this.subscription.email = this.model.email;
    this.subscribers.forEach((element: { email: string; }) => {
      console.log(element);
      if(element.email == this.subscription.email){
        this.isSubscribed = true;
        this.toastrService.warning('You are already subscribed to the newsletter!');
      }else{
        this.isSubscribed = false;
        this.accountService.addSubscribtion(this.subscription).subscribe({
          next:(response: any)=>{
            this.toastrService.success("Inscris cu succes la newsletter !")
            console.log(response);
            // this.cancel;
          },
          error:(error: { error: any; })=>{
            console.log(error)
          }
        })
      }
    });
    
  }
    //add email to the subscribers list
    validateSubscription(){
      console.log(this.subscribers);
      this.isSubscribed = false;
      for(var i=0;i< this.subscribers.length;i++){
        if(this.subscribers[i].email == this.user.username){
          this.isSubscribed = true;
        }
      }
      return this.isSubscribed;
    }

}

