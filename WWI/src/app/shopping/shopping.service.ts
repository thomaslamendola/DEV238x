import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor() { }
  
  categoryName = "";

  @Output() change: EventEmitter<string> = new EventEmitter();

  toggle(categoryName: string) {
    this.categoryName = categoryName;
    this.change.emit(this.categoryName);
  }

}
