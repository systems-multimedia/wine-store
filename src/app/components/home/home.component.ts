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
  x: number = 0;
  constructor(
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  slideLeft() {
    console.log('izquierda')
    if(this.x < 0) {
      this.x += 100;
      this.slide();
    }
  }

  slideRight() {
    const images = document.getElementsByClassName('carousel-img');
    if(this.x > (images.length - 1) * -100) {
      this.x -= 100;
      this.slide();
    }
  }
  private slide() {
    const images = document.getElementsByClassName('carousel-img');
    for(let i = 0; i < images.length; i++) {
      images[i].setAttribute('style', `transform: translateX(${this.x}%)`);
    }
  }

}
