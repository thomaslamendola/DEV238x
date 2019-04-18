import { Component, OnInit, HostBinding } from '@angular/core';
import { ShoppingService, SortBy } from '../shopping.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  categoryName = "";
  count = 0;
  total = 0;

  constructor(private shoppingService: ShoppingService, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getProducts().subscribe(productCategories => {
      productCategories.forEach(cat => {
        cat.subcategories.forEach(sub => {
          this.total += sub.items.length;
        });
      });
    });

    this.shoppingService.changeList.subscribe(category => {
      this.categoryName = category.name;
      this.count = category.items.length;
    });
  }

  sortBy(stringSortBy: string) {
    let parsedSortBy = <string>stringSortBy;
    this.shoppingService.sortBySelection(SortBy[parsedSortBy]);
  }

  toggleInStock() {
    this.shoppingService.inStockToggle();
  }

}
