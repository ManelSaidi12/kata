import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {BehaviorSubject, Observable} from "rxjs";
import {TaxService} from "./tax.service";
import {CartItem} from "../models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private cartItems: CartItem[] = [];
  private cartItems2: Product[] = [];

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartTotal: number = 0;
  constructor(private taxService: TaxService) {}

  get cartItems$(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }
  calculateTotalTTC() {
    this.cartTotal = 0;
    this.cartItems.forEach(cartItem => {
      cartItem.totalTaxes=this.taxService.calculateTaxes(cartItem);
      cartItem.prixUnitaireTTC=this.taxService.calculatePriceTTC(cartItem);

    });

  }
  addToCart(product: Product, quantity: number) {
    const existingItem = this.cartItems.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity += quantity;
      // @ts-ignore
      this.calculateTotalTTC();
    } else {
      this.calculateTotalTTC();
      // @ts-ignore
      this.cartItems.push({ product, quantity });
    }

    this.calculateTotalTTC(); // Recalculate cart totals
    this.cartItemsSubject.next(this.cartItems);
  }
  updateCart(cartItems: CartItem[]) {
    this.cartItemsSubject.next(cartItems);

  }

  }
