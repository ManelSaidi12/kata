import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";

import {CartItemService} from "../services/cart-item.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  cartItemCount: number = 0;

  constructor(private productService: ProductService, private cartService: CartItemService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.categories = Array.from(new Set(products.map(product => product.category || '')));
      this.filteredProducts = this.products;
    });
  }
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      if (this.selectedCategory === '' || product.category === this.selectedCategory) {
        return true;
      }
      return false;
    });
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    });
  }
  addToCart(product: Product) {
    product.cartItemCount = (product.cartItemCount || 0) + 1;
    product.quantity = (product.quantity || 0) - 1;
    this.cartService.addToCart(product,1);

  }

}
