import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ProductCategory, Item } from '../core/models/product-category';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private dataService: DataService) { }

  cart = [];
  productList: ProductCategory[];
  displayedColumns: string[] = ['imagelink', 'name', 'unitprice', 'qty', 'total', 'delete'];

  user = { 'name': '', 'address': '', 'city': '', 'phone': '' };

  subtotal = 0;
  shipping = 0;
  tax = 0;
  total = 0;

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.productList = products;
      this.allocateLocalCart();
    });
  }

  // rubric55
  updateQty(name: string, qty: number) {
    this.cartService.updateItem(name, qty);
    this.allocateLocalCart();
  }

  private allocateLocalCart() {
    this.cart = [];
    this.cartService.get().forEach((v, k) => {
      var item = this.getProductByName(k);
      if (item !== null)
        this.cart.push({ "product": item, "qty": v, "subtotal": item.price * v });
    });
    this.calculateCartTotals();
  }

  // rubric51
  displayCheckout() {
    let checkoutMsg = "";
    if (this.user.name === "" || this.user.address === "" || this.user.city === "" || this.user.phone === "") {
      // rubric52
      checkoutMsg = "Please insert all details!";
    } else {
      checkoutMsg += `Name: ${this.user.name}\n`;
      checkoutMsg += `Address: ${this.user.address}\n`;
      checkoutMsg += `City: ${this.user.city}\n`;
      checkoutMsg += `Phone: ${this.user.phone}\n`;
      checkoutMsg += `Total: $ ${this.total.toFixed(2)}`;
    }

    alert(checkoutMsg);
  }

  // rubric53
  // rubric54
  removeItem(name: string) {
    this.cartService.removeItemFromCart(name);
    this.allocateLocalCart();
  }

  private calculateCartTotals() {
    this.subtotal = 0;
    this.subtotal = this.cart.reduce(function (acc, obj) { return acc + obj.subtotal; }, 0);
    this.shipping = (this.subtotal > 0) ? 10 : 0;

    this.tax = this.subtotal / 10;
    this.total = this.subtotal + this.tax + this.shipping;
    return this.subtotal;
  }

  private getProductByName(name: string): Item {
    var result = null;
    this.productList.forEach(cat => {
      cat.subcategories.forEach(sub => {
        sub.items.forEach(item => {
          if (item.name === name) {
            result = item;
          }
        });
      });
    });
    return result;
  }
}
