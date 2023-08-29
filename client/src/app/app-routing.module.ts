import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';

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
      {path:'lists',component: ListsComponent},
      {path:'shoppingCart',component:ShoppingCartComponent},
      {path:'orders', component:OrdersComponent},
      {path:'messages',component: MessagesComponent},
    ]},
  
  {path:'**',component: HomeComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
