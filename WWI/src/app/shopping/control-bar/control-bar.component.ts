import { Component, OnInit, HostBinding } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  categoryName = "";
  count = 0;
  
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    // this.shoppingService.changeCategory.subscribe(categoryName => {
    //   this.categoryName = categoryName;
    // });
    this.shoppingService.changeList.subscribe(category => {
      this.categoryName = category.name;
      this.count = category.items.length;
    });
  }

}
