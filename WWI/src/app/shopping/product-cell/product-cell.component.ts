import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/core/models/product-category';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product-cell',
  templateUrl: './product-cell.component.html',
  styleUrls: ['./product-cell.component.css']
})
export class ProductCellComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
