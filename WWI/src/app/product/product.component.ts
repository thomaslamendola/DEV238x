import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Item, ProductCategory } from '../core/models/product-category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: string;
  private sub: any;
  item: Item = null;
  found: Boolean = false;
  categories: ProductCategory[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(categories => {
      this.categories = categories;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
          sub.items.forEach(item => {
            if (item.name === this.id) {
              this.item = item;
              this.found = true;
            }
          });
        });
      });
      if (!this.found) {
        this.router.navigate(['/not-found']);
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
