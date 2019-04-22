import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';
import {  DataService } from '../data.service';
import { Item } from '../core/models/product-category';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  productList: Item[] = [];

  constructor(private shoppingService: ShoppingService, private dataService: DataService) { }

  ngOnInit() {
    this.shoppingService.changeList.subscribe(category => {
      this.productList = category.items;
    });
  }
}