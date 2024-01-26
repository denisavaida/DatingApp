import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { DeliveryOptionsComponent } from './delivery/delivery-options/delivery-options.component';
import { PaymentComponent } from './delivery/payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryChangeComponent } from './delivery/delivery-change/delivery-change.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VoucherCreateComponent } from './voucher/voucher-create/voucher-create.component';
import { VoucherDetailComponent } from './voucher/voucher-detail/voucher-detail.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { CategorizedProductsComponent } from './products/categorized-products/categorized-products.component';
import { ReturPolicyComponent } from './help/retur-policy/retur-policy.component';
import { PaymentInfoComponent } from './help/payment-info/payment-info.component';
import { ShippingInfoComponent } from './help/shipping-info/shipping-info.component';
import { StoreLocationComponent } from './help/store-location/store-location.component';
import { ProductHomepageComponent } from './products/product-homepage/product-homepage.component';
import { AdministrationComponent } from './administration/administration.component';
import { GenerateCategoryComponent } from './generate-category/generate-category.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { DeliveryInfoComponent } from './delivery/delivery-info/delivery-info.component';
import { AddPhotosComponent } from './products/add-photos/add-photos.component';

const routes: Routes = [
  {path:'',component: HomeComponent, data:{breadcrumb:'Home'}},
  
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'users/edit/:username',component: MemberEditComponent,data:{breadcrumb:{alias:'memberEdit'}}},
      {path:'users/:username',component: MemberDetailComponent,data:{breadcrumb:{alias:'memberDetail'}}},
    
      {path:'favourites',component: FavouritesComponent},
      {path:'shoppingCart',component:ShoppingCartComponent},
      {path:'stock',component:StockComponent},
      {path:'orders', component:OrdersComponent},
      {path:'checkout',component:CheckoutComponent},
      {path:'messages',component: MessagesComponent},
      {path:'deliveryInfo',component:DeliveryInfoComponent},
      {path:'deliveryOptions',component:DeliveryOptionsComponent},
      {path:'deliveryChange',component:DeliveryChangeComponent},
      {path:'pay',component:PaymentComponent},
      {path:'confirmation',component:ConfirmationComponent},
      {path:'voucherCreate',component:VoucherCreateComponent},
      {path:'voucherDetail',component:VoucherDetailComponent},
      {path:'generateCategory', component:GenerateCategoryComponent},
      {path:'administration', component:AdministrationComponent}
    ]},
  {path:'products',component: ProductHomepageComponent},
  {path:'products',
    children:[{path:'all-products',component: ProductCardComponent},
    {path:'edit/:id', component:ProductEditComponent,data:{breadcrumb:{alias:'edit'}}},
    // {path:':id',component:ProductDetailComponent, data:{breadcrumb:{alias:'productDetails'}}},
    {path:'category/:category',component:CategorizedProductsComponent,data:{breadcrumb:{alias:'categorized'}}},
    {path:':category',
      children:[
        {path:'',component:CategorizedProductsComponent},
        {path:':id',component:ProductDetailComponent, data:{breadcrumb:{alias:'productDetails'}}}
      ]
    
  }
  ]},
  {path:'add-photo/:id', component: AddPhotosComponent,data:{breadcrumb:{alias:'add-photos'}}},
  {path:'promotions',component:PromotionsComponent},
  {path:'retur',component:ReturPolicyComponent},
  {path:'payment',component:PaymentInfoComponent},
  {path:'shipping',component:ShippingInfoComponent},
  {path:'locations',component:StoreLocationComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'errors', component: TestErrorComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**',component: NotFoundComponent, pathMatch:'full'},
];

@NgModule({
  imports:[RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
