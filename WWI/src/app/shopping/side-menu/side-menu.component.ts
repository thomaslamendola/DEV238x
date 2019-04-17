import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { DataService, ProductCategory } from 'src/app/data.service';
import { Observable } from 'rxjs';

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
      console.log(items);
    });
  }

  click(categoryName: string) {
    this.shoppingService.categorySelection(categoryName);
  }
}
