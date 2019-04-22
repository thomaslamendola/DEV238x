import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //@Output() addToCart: EventEmitter<Map<string, number>> = new EventEmitter();

  cart = new Map();

  constructor() { }

  addItemToCart(productName: string) {
    this.cart.has(productName) ? this.cart.set(productName, this.cart.get(productName)+1) : this.cart.set(productName, 1);
    console.log(this.cart);
    //this.addToCart.emit(this.cart);
  }
}
