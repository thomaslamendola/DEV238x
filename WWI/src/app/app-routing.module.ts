import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'product', component: ProductComponent },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
