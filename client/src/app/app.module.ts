import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyStrategy, NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
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
import { CartService } from './_services/cart.service';
import { ProductService } from './_services/product.service';
import { FavouritesService } from './_services/favourites.service';
import { PromotionsComponent } from './promotions/promotions.component';
import { DeliveryOptionsComponent } from './delivery/delivery-options/delivery-options.component';
import { PaymentComponent } from './delivery/payment/payment.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeliveryChangeComponent } from './delivery/delivery-change/delivery-change.component';
import { CheckoutService } from './_services/checkout.service';
import { CategoryService } from './_services/category.service';
import { MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VoucherService } from './_services/voucher.service';
import { VoucherDetailComponent } from './voucher/voucher-detail/voucher-detail.component';
import { VoucherCreateComponent } from './voucher/voucher-create/voucher-create.component';
import { PromotionService } from './_services/promotion.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CategorizedProductsComponent } from './products/categorized-products/categorized-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import { RatingComponent } from './products/rating/rating.component';
import { ReturPolicyComponent } from './help/retur-policy/retur-policy.component';
import { PaymentInfoComponent } from './help/payment-info/payment-info.component';
import { ShippingInfoComponent } from './help/shipping-info/shipping-info.component';
import { StoreLocationComponent } from './help/store-location/store-location.component';
import { NextDirective } from './home/next.directive';
import { PrevDirective } from './home/prev.directive';
import {MatTableModule} from '@angular/material/table';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ProductHomepageComponent } from './products/product-homepage/product-homepage.component';
import { AdministrationComponent } from './administration/administration.component';
import { GenerateCategoryComponent } from './generate-category/generate-category.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { DeliveryInfoComponent } from './delivery/delivery-info/delivery-info.component';
import {MatTreeModule} from '@angular/material/tree';
import { AddPhotosComponent } from './products/add-photos/add-photos.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

const routes = [
  {path: '', component: AppComponent},
];
@NgModule({exports: [ MatFormFieldModule, MatInputModule ],
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberEditComponent,
    MemberDetailComponent,
    FavouritesComponent,
    MessagesComponent,
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
    DeliveryInfoComponent,
    DeliveryOptionsComponent,
    PaymentComponent,
    CheckoutComponent,
    DeliveryChangeComponent,
    ConfirmationComponent,
    VoucherDetailComponent,
    VoucherCreateComponent,
    CategorizedProductsComponent,
    RatingComponent,
    ReturPolicyComponent,
    PaymentInfoComponent,
    ShippingInfoComponent,
    StoreLocationComponent,
    NextDirective,
    PrevDirective,
    ProductHomepageComponent,
    AdministrationComponent,
    GenerateCategoryComponent,
    AddPhotosComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSelectModule,
    NgbModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTreeModule,
    BreadcrumbModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    
    TabsModule.forRoot(),
    RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})
  ],  
  providers: [ AccountService,CartService,ProductService,FavouritesService, CheckoutService, CategoryService,VoucherService, PromotionService,  
    {provide: RouteReuseStrategy, useClass: MyStrategy},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
