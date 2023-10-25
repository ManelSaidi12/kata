import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path: '', component: ProductComponent }, // Define a route for the cart page

  { path: 'cart', component: CartComponent }, // Define a route for the cart page
  // Add other routes as needed
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
