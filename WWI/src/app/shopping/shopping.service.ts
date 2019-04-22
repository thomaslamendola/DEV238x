import { Injectable, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { ProductCategory, SubCategory, SortBy } from '../core/models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private dataService: DataService) {
    this.dataService.getProducts().subscribe(products => {
      this.productList = this.getCopyOf(products);
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
    this.globalFilter();
  }

  sortBySelection(sortBy: SortBy) {
    this.sortBy = sortBy;
    this.globalFilter();
  }

  inStockToggle() {
    this.inStock = !this.inStock;
    this.globalFilter();
  }

  globalFilter() {
    this.applyCategoryFilter();
    this.applyInStockFilter();
    this.applySortByFilter();
    this.changeList.emit(this.filteredList);
  }

  applyCategoryFilter() {
    this.productList.forEach(current => {
      let found = current.subcategories.filter(subcat => subcat.name === this.categoryName);
      if (found.length) this.filteredList = this.getCopyOf(found[0]);
    });
  }

  applyInStockFilter() {
    if (this.inStock)
      this.filteredList.items = this.filteredList.items.filter(item => item.stock !== "0");
  }

  applySortByFilter() {
    switch (this.sortBy) {
      case SortBy.Alphabetical:
        this.filteredList.items.sort(this.compareValues('name'));
        break;
      case SortBy.Price:
        this.filteredList.items.sort(this.compareValues('price'));
        break;
      case SortBy.Rating:
        this.filteredList.items.sort(this.compareValues('rating'));
        break;
      default:
        break;
    }
  }

  private compareValues(key) {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return comparison;
    };
  }

  getCopyOf(anything) {
    return JSON.parse(JSON.stringify(anything));
  }
}
