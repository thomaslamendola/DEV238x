import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

export interface ILiteProduct {
  name: string;
  imageLink: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private dataService: DataService) { }

  slideIndex: number;
  productList: Array<ILiteProduct>;
  enabled: Boolean;
  interval: any;

  ngOnInit() {
    this.slideIndex = 1;
    this.dataService.getProducts().subscribe(productCategories => {
      let subCategories = productCategories.map(category => category.subcategories).reduce((a, b) => a.concat(b), []);
      let items = subCategories.map(subCategory => subCategory.items).reduce((a, b) => a.concat(b), []);
      let liteItems = items.map(item => {
        let result: ILiteProduct = {
          imageLink: item.imagelink,
          name: item.name
        };
        return result;
      });
      this.shuffleArray(liteItems);
      this.productList = liteItems.slice(0, 12);
    });
  }

  toggleSlideShow() {
    if (this.enabled) {
      this.interval = setInterval(() => this.plusSlides(1), 3000);
    } else {
      clearInterval(this.interval);
    }
  }

  ngAfterViewChecked() {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  setSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  showSlides(n: number) {
    var i: number;
    var slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    var pages = document.getElementsByClassName("page");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i]["style"].display = "none";
    }
    for (i = 0; i < pages.length; i++) {
      pages[i].className = pages[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1]["style"].display = "block";
    pages[this.slideIndex - 1].className += " active";
  }

}
