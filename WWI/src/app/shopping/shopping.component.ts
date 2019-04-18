import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Item, DataService } from '../data.service';

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
