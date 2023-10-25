import {Component, OnInit} from '@angular/core';
import {CartItemService} from "../services/cart-item.service";
import {CartItem} from "../models/CartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotalTaxes: number = 0;
  cartTotalTTC: number = 0;
  panierVide:boolean=false;

  constructor(private cartService: CartItemService) {
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateCartTotals();
      this.IsEmtyCart(cartItems);
    });
  }

  calculateCartTotals() {
    this.cartTotalTaxes = this.calculateTotaltaxe();
    this.cartTotalTTC = this.calculateTotalTTC();
  }

  calculateTotaltaxe() {
    return this.cartItems.reduce((total, cartItem) => {
      return  Math.ceil((total + (cartItem.totalTaxes * cartItem.quantity)) / 0.05) * 0.05;
    }, 0);
  }

  calculateTotalTTC() {
    return this.cartItems.reduce((total, cartItem) => {
      return Math.ceil((total + (cartItem.prixUnitaireTTC * cartItem.quantity))/ 0.05) * 0.05;
      }, 0);
  }

  removeFromCart(cartItem: CartItem): void {

    this.cartItems = this.cartItems.filter(item => item !== cartItem);
    this.cartService.updateCart(this.cartItems);
    this.IsEmtyCart(this.cartItems);
    this.calculateCartTotals();
  }
  IsEmtyCart(cartItems: CartItem[]):boolean{
    if (cartItems.length===0){
    this.panierVide=true;
    }
    return this.panierVide;
  }

}
