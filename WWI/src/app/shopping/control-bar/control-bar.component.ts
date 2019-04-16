import { Component, OnInit, HostBinding } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  categoryName = "Default";
  
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.change.subscribe(categoryName => {
      this.categoryName = categoryName;
    });
  }

}
