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

  categorySelection(categoryName: string, defaultList: Boolean = false) {
    this.categoryName = categoryName;
    this.productList.forEach(current => {
      let found = current.subcategories.filter(subcat => subcat.name === this.categoryName);
      if (found.length) this.filteredList = found[0];
    });
    this.changeList.emit(this.filteredList);
  }

  sortBySelection(sortBy: SortBy) {
    switch (sortBy) {
      case SortBy.Alphabetical:
        var list = this.getCopyOf(this.filteredList);
        list.items.sort(this.compareValues('name'));
        this.changeList.emit(list);
        break;
      case SortBy.Price:
        var list = this.getCopyOf(this.filteredList);
        list.items.sort(this.compareValues('price'));
        this.changeList.emit(list);
        break;
      case SortBy.Rating:
        var list = this.getCopyOf(this.filteredList);
        list.items.sort(this.compareValues('rating'));
        this.changeList.emit(list);
        break;
      default:
        this.categorySelection(this.categoryName, true);
        break;
    }
  }

  inStockToggle() {
    this.inStock = !this.inStock;
    var list = this.getCopyOf(this.filteredList);
    if (this.inStock)
      list.items = list.items.filter(item => item.stock !== "0");
    this.changeList.emit(list);
    alert("sort by needs to still apply");
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

  getCopyOf(array) {
    return JSON.parse(JSON.stringify(array));
  }
}
