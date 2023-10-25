import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItemService} from "../services/cart-item.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartItemCount: number = 0;

  constructor(private cartService: CartItemService,private router: Router) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItemCount = 0;
      for (let i = 0; i < cartItems.length; i++) {
        this.cartItemCount=this.cartItemCount+cartItems[i].quantity
      }
      cartItems.length
    });
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }
  goToCartProduct() {
    this.router.navigate(['/']);
  }
}
