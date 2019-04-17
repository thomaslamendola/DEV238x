import { Injectable, Output, EventEmitter } from '@angular/core';
import { ProductCategory, DataService, SubCategory } from '../data.service';

export enum SortBy {
  None,
  Price,
  Alphabetical,
  Rating
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private dataService: DataService) {
    this.dataService.getProducts().subscribe(products => {
      this.productList = products;
      this.categorySelection(this.productList[0].subcategories[0].name);
    });
  }

  categoryName = "";
  inStock = false;
  sortBy = SortBy.None;
  productList: ProductCategory[] = [];
  filteredList: SubCategory = { name: "", items: [] };

  @Output() changeList: EventEmitter<SubCategory> = new EventEmitter();

  categorySelection(categoryName: string) {
    this.categoryName = categoryName;
    this.productList.forEach(current => {
      let found = current.subcategories.filter(subcat => subcat.name === this.categoryName);
      if (found.length) this.filteredList = found[0];
    });
    this.changeList.emit(this.filteredList);
  }

  sortBySelection(sortBy: SortBy) {
    //considered as filter update (send filtered list)
  }

  inStockToggle() {
    //considered as filter update (send filtered list)
  }

  private filterList() {

  }
}
