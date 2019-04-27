import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/core/models/product-category';
import { MatCardModule } from '@angular/material/card';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-cell',
  templateUrl: './product-cell.component.html',
  styleUrls: ['./product-cell.component.css']
})
export class ProductCellComponent implements OnInit {

  @Input() item: Item;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }
  
  // rubric30
  add(name: string) {
    this.cartService.addItemToCart(name);
  }

}
