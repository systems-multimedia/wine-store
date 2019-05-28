import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  private id: string;
  private rating: number = 0;
  product: Observable<Product>;
  stars: number[] = [];
  quant: number = 1;
  tags: string[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(this.id);
    console.log(this.product);

    this.product.subscribe(product => {
      if (product.comments) {
        let sum: number = 0;
        product.comments.forEach(comment => {
          sum += comment.rating;
        })
        this.rating = (sum / product.comments.length);
      }

      this.tags = product.tags;
    })

    for (let i = 0; i < this.rating; i++) {
      if (i <= this.rating) {
        this.stars[i] = 1;
      } else {
        this.stars[i] = 0;
      }
    }

    // console.log(this.rating);
  }

  check() {
    console.log(this.quant);
  }

  checkout(prod: Product) {
    let order = {
      product: prod,
      quant: this.quant
    }
    this.quant = 1;
    this.router.navigate(['/home'])
    let x = {
      product: {
        name: 'Vino',
        price: 500,
        available: 12
      },
      quant: 2
    }
    return this.productService.addToCart(order);
    localStorage.setItem('cartItems', JSON.stringify([x, order]));
    return console.log(JSON.parse(localStorage.getItem('cartItems')));
  }

}
