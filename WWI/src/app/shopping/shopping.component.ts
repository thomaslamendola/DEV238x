import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Item } from '../data.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  productList: Item[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.changeList.subscribe(category => {
      // this.categoryName = category.name;
      this.productList = category.items;
    });
  }

}
