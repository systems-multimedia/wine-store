import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Observable<Product[]>;
  offers: Observable<Product[]>;
  sections: string[];
  x: number = 0;
  y: number = 0;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.offers = this.productService.getOffers();
    this.sections = this.productService.getSections();
  }

  slideLeft(className: string) {
    // console.log('izquierda')
    switch (className) {
      case 'product-carousel':
        if (this.y < 0) {
          this.y += 100;
          this.slide(className, this.y);
        }
        break;
      default:
        if (this.x < 0) {
          this.x += 100;
          this.slide(className, this.x);
        }
        break;
    }
  }
  slideRight(className: string) {
    const images = document.getElementsByClassName(className);
    switch (className) {
      case 'product-carousel':
        if (images[images.length - 1].getBoundingClientRect().right >= (window.innerWidth - 35)) {
          this.y -= 100;
          this.slide(className, this.y);
        }
        break;
      default:
        if (this.x > (images.length - 1)*-100) {
          this.x -= 100;
          this.slide(className, this.x);
        }
        break;
    }
    // if ((this.x > (images.length - 1) * -100 && className !== 'product-carousel') || (className === 'product-carousel' && (images[images.length - 1].getBoundingClientRect().right >= (window.innerWidth - 35)))) {
    // }
  }
  private slide(className: string, distance: number) {
    const images = document.getElementsByClassName(className);
    for (let i = 0; i < images.length; i++) {
      images[i].setAttribute('style', `transform: translateX(${distance}%)`);
    }
  }

}
