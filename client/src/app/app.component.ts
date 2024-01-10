import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { SubscribeNewsletter } from './_models/subscription';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Koala Kids Shop';
  user: any;
  currentUser: any ;
  // model:any={};
  subscribers: any= [];
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
  constructor(private http: HttpClient, private accountService: AccountService, private toastrService:ToastrService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    //this.getUsers();
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

  loadSubscribers(){
    this.accountService.getSubscribers().subscribe({
      next: subscribers => {
        this.subscribers = subscribers;
        console.log(this.subscribers);
      }
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  subscribeNews(){
    // this.subscription.email = this.model.email;
    console.log(this.subscription);
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
    //add email to the subscribers list
    validateSubscription(){
      var flag = false;
      for(var i=0;i< this.subscribers.count;i++){
        if(this.subscribers[i].email == this.user.email){
          flag = true;
        }
      }
      return flag;
    }

}

