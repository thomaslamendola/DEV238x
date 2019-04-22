import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/core/models/product-category';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private shoppingService: ShoppingService,
    private dataService: DataService) { }

  items: ProductCategory[];
  observableProducts: Observable<ProductCategory[]>;

  ngOnInit() {
    this.observableProducts = this.dataService.getProducts();
    this.observableProducts.subscribe(items => {
      this.shoppingService.categorySelection(items[0].subcategories[0].name);
    });
  }

  click(categoryName: string) {
    this.shoppingService.categorySelection(categoryName);
  }
}