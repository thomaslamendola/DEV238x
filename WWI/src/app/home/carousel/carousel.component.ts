import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private dataService: DataService) { }

  slideIndex: number;
  imageList: Array<string>;

  ngOnInit() {
    this.slideIndex = 1;
    this.dataService.getProducts().subscribe(productCategories => {
      let subCategories = productCategories.map(category => category.subcategories).reduce((a, b) => a.concat(b), []);
      let items = subCategories.map(subCategory => subCategory.items).reduce((a, b) => a.concat(b), []);
      this.imageList = items.map(item => item.imagelink).slice(0, 12);
    });
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

  showSlides(n: number) {
    var i: number;
    var slides = document.getElementsByClassName("slide");
    if(slides.length === 0) return;
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
