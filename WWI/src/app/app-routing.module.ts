import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  // rubric56
  { path: 'cart', component: CartComponent },
  // rubric34
  { path: 'shopping', component: ShoppingComponent },
  // rubric46
  { path: 'product', component: ProductComponent },
  // rubric64
  { path: 'about', component: AboutComponent },
  // rubric62
  { path: 'contact', component: ContactComponent },
  // rubric13
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
