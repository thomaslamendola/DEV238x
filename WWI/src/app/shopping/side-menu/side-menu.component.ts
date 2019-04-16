import { Component, OnInit, HostListener } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  click(categoryName: string) {
    this.shoppingService.toggle(categoryName);
  }
}
