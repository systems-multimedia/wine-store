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
  total: number = 0;
  deals: number = 0;
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
        orders.forEach(order => {
          if(order) {
            this.total = this.total + ((order.product.price - ((order.product.price * order.product.offer)/100)) * order.quant);
            this.deals = this.deals + (order.product.offer * order.quant);
          }
        })
      }
    })
  }

  calcTotal() {
    this.total = 0;
    this.deals = 0;
    this.orders.subscribe(orders => {
      if(orders) {
        orders.forEach(order => {
          if(order) {
            this.total = this.total + ((order.product.price - ((order.product.price * order.product.offer)/100)) * order.quant);
            this.deals = this.deals + (order.product.offer * order.quant);
          }
        })
      }
    })
  }

  delete(id: string) {
    if(confirm('quiere eliminar este producto?')) {
      this.orders = this.product.deleteOrder(id);
      this.calcTotal();
    }
  }

  checking(i) {
    console.log(this.addProduct[i]);
  }
}
