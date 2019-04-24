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

  subtotal = 0;
  shipping = 10;
  tax = 0;
  total = 0;

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.productList = products;
      this.allocateLocalCart();
    });
  }

  private allocateLocalCart() {
    this.subtotal = 0;
    this.cart = [];
    this.cartService.get().forEach((v, k) => {
      var item = this.getProductByName(k);
      if (item !== null)
        this.cart.push({ "product": item, "qty": v, "subtotal": item.price * v });
    });
    this.calculateCartTotals();
  }

  removeItem(name: string) {
    this.cartService.removeItemFromCart(name);
    this.allocateLocalCart();
  }

  private calculateCartTotals() {
    this.subtotal = this.cart.reduce(function (acc, obj) { return acc + obj.subtotal; }, 0);
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
