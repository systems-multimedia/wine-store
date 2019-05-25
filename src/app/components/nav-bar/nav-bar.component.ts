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
  sort = document.getElementsByClassName('sort_option');
  sort_term: string = 'Todo'
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    for (let i = 0; i < this.sort.length; i++) {
      this.sort[i].addEventListener('click', () => {
        this.sort_term = this.sort[i].firstChild.textContent;
      })
    }
  }

  search(term: any) {
    this.router.navigate([`products/${this.sort_term}/search/${term}`]).then(() => {
      if (window.location.pathname.split('search').length > 0) {
        window.location.reload();
      }
    })
  }

}
