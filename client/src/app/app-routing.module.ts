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
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { DeliveryInfoComponent } from './delivery/delivery-info/delivery-info.component';
import { DeliveryOptionsComponent } from './delivery/delivery-options/delivery-options.component';
import { PaymentComponent } from './delivery/payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryChangeComponent } from './delivery/delivery-change/delivery-change.component';
import { DeliveryEditComponent } from './delivery/delivery-edit/delivery-edit.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VoucherCreateComponent } from './voucher/voucher-create/voucher-create.component';
import { VoucherDetailComponent } from './voucher/voucher-detail/voucher-detail.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { CategorizedProductsComponent } from './products/categorized-products/categorized-products.component';
import { ReturPolicyComponent } from './help/retur-policy/retur-policy.component';
import { PaymentInfoComponent } from './help/payment-info/payment-info.component';
import { ShippingInfoComponent } from './help/shipping-info/shipping-info.component';
import { StoreLocationComponent } from './help/store-location/store-location.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'users/edit/:username',component: MemberEditComponent},
      {path:'users/:username',component: MemberDetailComponent},
      {path:'products/edit/:id', component:ProductEditComponent},
      {path:'favourites',component: FavouritesComponent},
      {path:'shoppingCart',component:ShoppingCartComponent},
      {path:'stock',component:StockComponent},
      {path:'orders', component:OrdersComponent},
      {path:'checkout',component:CheckoutComponent},
      {path:'messages',component: MessagesComponent},
      {path:'deliveryInfo',component:DeliveryInfoComponent},
      {path:'deliveryOptions',component:DeliveryOptionsComponent},
      {path:'deliveryChange',component:DeliveryChangeComponent},
      {path:'delivery/edit/:id',component: DeliveryEditComponent},
      {path:'payment',component:PaymentComponent},
      {path:'confirmation',component:ConfirmationComponent},
      {path:'voucherCreate',component:VoucherCreateComponent},
      {path:'voucherDetail',component:VoucherDetailComponent},
    ]},
  {path:'promotions',component:PromotionsComponent},
  {path:'products',component: ProductCardComponent},
  {path:'products/:id',component:ProductDetailComponent},
  {path:'categorizedProducts/:category',component:CategorizedProductsComponent},
  {path:'returPolicy',component:ReturPolicyComponent},
  {path:'paymentInfo',component:PaymentInfoComponent},
  {path:'shippingInfo',component:ShippingInfoComponent},
  {path:'storeLocation',component:StoreLocationComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'errors', component: TestErrorComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**',component: NotFoundComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
