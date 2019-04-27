import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Item, ProductCategory } from '../core/models/product-category';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  name: string;
  private sub: any;
  item: Item = null;
  found: Boolean = false;
  categories: ProductCategory[] = [];
  selectedQty: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService, 
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(categories => {
      this.categories = categories;
    });

    this.sub = this.route.queryParams
    .subscribe(params => {
      this.name = params['name'];
      this.categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
          sub.items.forEach(item => {
            if (item.name === this.name) {
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
  
  // rubric44
  add() {
    this.cartService.addItemsToCart(this.name, this.selectedQty);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
