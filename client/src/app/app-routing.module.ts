import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
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

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'users/edit/:user',component: MemberEditComponent},
      {path:'users/:username',component: MemberDetailComponent},
      {path:'promotions',component:PromotionsComponent},
      {path:'products',component: ProductListComponent},
      {path:'products/:id',component:ProductDetailComponent},
      {path:'products/edit/:id', component:ProductEditComponent},
      {path:'favourites',component: FavouritesComponent},
      {path:'shoppingCart',component:ShoppingCartComponent},
      {path:'stock',component:StockComponent},
      {path:'orders/:id', component:OrdersComponent},
      {path:'messages',component: MessagesComponent},
    ]},
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
