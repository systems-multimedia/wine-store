import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  search_term: string = '';
  sort = document.getElementsByClassName('sort_option');
  sort_term: string = 'Todo';
  user_url: string = 'my-profile';
  orders: Observable<Array<{
    product: Product,
    quant: number
  }>>;
  constructor(
    private productService: ProductService,
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    if(this.auth.uid) {
      this.user_url = this.user_url + `/user/${this.auth.uid}`;
    }
    for (let i = 0; i < this.sort.length; i++) {
      this.sort[i].addEventListener('click', () => {
        this.sort_term = this.sort[i].firstChild.textContent;
      })
    }

    this.orders = this.productService.getOrders();
  }

  search(term: any) {
    this.router.navigate([`products/${this.sort_term}/search/${term}`]).then(() => {
      if (window.location.pathname.split('search').length > 0) {
        window.location.reload();
      }
    })
  }

}
