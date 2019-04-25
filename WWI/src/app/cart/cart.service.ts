import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Map<string, number>();

  constructor() { }

  addItemToCart(productName: string) {
    this.addItemsToCart(productName);
  }

  addItemsToCart(productName: string, qty: number = 1) {
    this.cart.has(productName) ? this.cart.set(productName, this.cart.get(productName) + qty) : this.cart.set(productName, qty);
  }

  get() {
    return this.cart;
  }

  reset() {
    this.cart = new Map<string, number>();
  }

  removeItemFromCart(productName: string) {
    this.cart.delete(productName);
  }

  updateItem(productName: string, qty: number) {
    this.cart.set(productName, qty);
  }
}
