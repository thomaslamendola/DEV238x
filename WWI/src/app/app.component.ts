import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ProductCategory } from './core/models/product-category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.showData();
  }

  constructor(private dataService: DataService) { }

  data: ProductCategory[];

  // rubric80 - Happening across the board thanks to Angular
  showData() {
    this.dataService.initialise();
  }
}