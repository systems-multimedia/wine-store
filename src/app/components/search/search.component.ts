import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService, SearchParam } from 'src/app/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searchTerm: string = '';
  private range: string = '';
  tags: string[];
  searchParams: SearchParam;
  limit: number = 0;
  products: Observable<Product[]>;
  type: string = 'todo';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.params['name'];
    this.range = this.route.snapshot.params['range'];
    this.products = this.productService.listProduct(this.searchTerm, this.range);
    this.searchParams = this.productService.getSearchParams();
    this.tags = this.searchParams.tags;
  }

  getTags() {
    return this.tags.sort();
  }

  filter(filter: string, num: number) {
    switch (filter) {
      case 'tag':
        this.router.navigate([`products/${this.range}/search/${this.searchParams.tags[num]}`]).then(() => {
          if (window.location.pathname.split('search').length > 0) {
            window.location.reload();
          }
        })
        break;
      case 'price':
        this.limit = num;
        console.log(this.limit);
        break;
      case 'category':
        // this.type = this.searchParams.kind[num].toLowerCase();
        this.router.navigate([`products/${this.searchParams.kind[num]}/search/${this.searchTerm}`]).then(() => {
          if (window.location.pathname.split('search').length > 0) {
            window.location.reload();
          }
        })
        break;
    }
  }

}
