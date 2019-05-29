import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orders: Observable<Array<{
    product: Product,
    quant: number
  }>>;
  addProduct: Array<true>;
  constructor(
    private product: ProductService
  ) { }

  ngOnInit() {
    this.orders = this.product.getOrders();
    this.orders.subscribe(orders => {
      if(orders) {
        this.addProduct = new Array(orders.length);
        for(let i = 0; i< this.addProduct.length; i++) {
          this.addProduct[i] = true;
        }
      }
    })
  }

  checking(i) {
    console.log(this.addProduct[i]);
  }
}
