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
  constructor(
    private product: ProductService
  ) { }

  ngOnInit() {
    this.orders = this.product.getOrders();
  }

}
