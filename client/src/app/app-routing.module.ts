import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component: MemberListComponent},
      {path:'members/:id',component: MemberDetailComponent},
      {path:'products',component: ProductListComponent},
      {path:'products/:id',component:ProductDetailComponent},
      {path:'favourites',component: FavouritesComponent},
      {path:'shoppingCart',component:ShoppingCartComponent},
      {path:'stock',component:StockComponent},
      {path:'orders', component:OrdersComponent},
      {path:'messages',component: MessagesComponent},
    ]},
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
