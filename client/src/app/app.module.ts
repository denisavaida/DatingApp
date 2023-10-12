import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from './_modules/shared.module';
import { StockComponent } from './stock/stock.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdressComponent } from './adress/adress.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './_services/account.service';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CartService } from './_services/cart.service';
import { ProductService } from './_services/product.service';
import { FavouritesService } from './_services/favourites.service';
import { PromotionsComponent } from './promotions/promotions.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberEditComponent,
    MemberDetailComponent,
    FavouritesComponent,
    MessagesComponent,
    ProductListComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrdersComponent,
    StockComponent,
    AdressComponent,
    ProductCardComponent,
    LoginComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProductEditComponent,
    PromotionsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    })
  ],
  providers: [ AccountService,CartService,ProductService,FavouritesService,
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
