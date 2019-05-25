import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  searchParams: SearchParam;
  products: Observable<Product[]>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.params['name'];
    this.range = this.route.snapshot.params['range'];
    this.products = this.productService.listProduct(this.searchTerm, this.range);
    this.searchParams = this.productService.getSearchParams();

    // const tags = document.getElementsByClassName('tag');
    // for(let i = 0; i< tags.length; i++) {
    //   tags[i].addEventListener('click', () => {
    //     alert(this.searchParams.tags[i]);
    //   })
    // }
    console.log(this.searchParams);
    // console.log(this.searchTerm);
  }

  filter(filter: string, num: number) {
    switch (filter) {
      case 'tag':
        console.log(this.searchParams.tags[num]);
        break;
      case 'price':
        console.log(num);
        break;
      case 'category':
        console.log(this.searchParams.kind[num]);
        break;
    }
  }

}
