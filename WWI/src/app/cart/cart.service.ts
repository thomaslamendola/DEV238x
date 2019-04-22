import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Map();

  constructor() { }

  addItemToCart(productName: string) {
    this.addItemsToCart(productName);
  }

  addItemsToCart(productName: string, qty: number = 1) {
    this.cart.has(productName) ? this.cart.set(productName, this.cart.get(productName) + qty) : this.cart.set(productName, qty);
    console.log(this.cart);
  }

  get() {
    return this.cart;
  }

  reset() {
    this.cart = new Map();
  }
}
