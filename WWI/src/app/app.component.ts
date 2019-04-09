import { Component, OnInit } from '@angular/core';
import { DataService, ProductCategory } from './data.service';

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

  showData() {
    this.dataService.getProducts().subscribe((data: ProductCategory[]) => {
      this.data = { ...data };
      console.log(this.data);
    });
  }
}