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

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.productList = products;
      this.cartService.get().forEach((v, k) => {
        var item = this.getProductByName(k);
        if(item !== null)
          this.cart.push({"product": item, "qty": v});
      });
    });
  }

  private getProductByName(name: string) {
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
