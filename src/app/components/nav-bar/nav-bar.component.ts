import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  search_term: string = '';
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(term: any) {
    this.router.navigate([`products/search/${term}`]).then(() => {
      if(window.location.pathname.split('search').length>0){
        window.location.reload();
      }
    })
  }

}
