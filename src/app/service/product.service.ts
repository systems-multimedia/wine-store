import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';

export interface SearchParam {
  lower_price?: number,
  max_price?: number,
  kind?: string[],
  origin?: string[],
  tags?: string[]
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  // name: string,
  //   type: string,
  //   price: number,
  //   available: number,
  //   offer: number,
  //   id: string | number,
  //   image: string | string[],
  //   tags: string | string[],
  //   origin?: string,
  //   quant?: number
  private products: Product[] = [
    {
      name: 'Aberlour Single Malt 12 Años',
      type: 'licores',
      price: 1850,
      available: 12,
      offer: 10,
      id: 1,
      image: 'https://i0.wp.com/thewine.com.uy/wp-content/uploads/2018/08/whi_esc-sin_mal-f24.jpg?fit=750%2C750',
      tags: 'Whisky, Whisky Escocés, Whisky Escocés Single Malt'.split(', '),
      origin: 'escocés',
      quant: 700
    },
    {
      name: 'Alamos Cabernet Sauvignon',
      type: 'licores',
      price: 390,
      available: 10,
      offer: 0,
      id: 2,
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750
    },
    {
      name: 'Saint Felicien Malbec',
      type: 'licores',
      price: 620,
      available: 8,
      offer: 12,
      id: 3,
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750
    },
    {
      name: 'Alamos Chardonnay',
      type: 'licores',
      price: 390,
      available: 20,
      offer: 0,
      id: 4,
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f08.jpg?fit=750%2C750',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750
    },
    {
      name: 'Alamos Malbec',
      type: 'licores',
      price: 390,
      available: 12,
      offer: 8,
      id: 5,
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f07.jpg?fit=750%2C750',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750
    },
    {
      name: 'Alta Gama Dinastia',
      type: 'licores',
      price: 1340,
      available: 22,
      offer: 18,
      id: 6,
      image: 'https://i0.wp.com/thewine.com.uy/wp-content/uploads/2018/08/vin_nac-h_sta-f06.jpg?fit=750%2C750',
      tags: 'H. Stagnari, Vinos Nacionales, Dinastia, Tinto, vino'.split(', '),
      origin: 'uruguay',
      quant: 750
    },
    {
      name: 'Alta Reserva Malbec Rosé',
      type: 'licores',
      price: 290,
      available: 5,
      offer: 0,
      id: 7,
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Gimenez Mendez, Vinos Nacionales, Malbec Rosé, Rosado, vino'.split(', '),
      origin: 'uruguay',
      quant: 750
    },
    {
      name: 'MORCILLA ACHORIZADA IBÉRICA',
      type: 'embutidos',
      price: 3.6,
      available: 20,
      offer: 0,
      id: 8,
      image: 'http://www.montesierra.com/image/cache/data/productos/morcilla-achorizada-600x600.jpg',
      tags: 'Montesierra, morcilla, chorizo'.split(', '),
    },
    {
      name: 'SALCHICHÓN CULAR IBÉRICO BELLOTA',
      type: 'embutidos',
      price: 11,
      available: 6,
      offer: 8,
      id: 9,
      image: 'http://www.montesierra.com/image/cache/data/productos/foto6-600x600.jpg',
      tags: 'salchichón'.split(', '),
    },
    {
      name: 'SALCHICHÓN EXTRA IBÉRICO',
      type: 'embutidos',
      price: 6,
      available: 9,
      offer: 0,
      id: 10,
      image: 'http://www.montesierra.com/image/cache/data/productos/SALCHICHON-EXTRA-IBERICO-600x600.jpg',
      tags: 'salchichón, ibérico'.split(', '),
    },
    {
      name: 'CHORIZO IBÉRICO SERRANITO MONTESIERRA',
      type: 'embutidos',
      price: 4,
      available: 17,
      offer: 30,
      id: 11,
      image: 'http://www.montesierra.com/image/cache/data/productos/chorizo-serranito-600x600.jpg',
      tags: 'Montesierra, chorizo, ibérico'.split(', '),
    },
    {
      name: 'LOMO EMBUCHADO DE BELLOTA IBÉRICO 100% IBÉRICO MARTÍN HIERRO',
      type: 'embutidos',
      price: 50,
      available: 23,
      offer: 20,
      id: 12,
      image: 'http://www.montesierra.com/image/cache/data/productos/lomo_iberico_bellota-600x600.jpg',
      tags: 'Martín Hierro, lomo, embuchado, bellota, ibérico'.split(', '),
    },
    {
      name: 'LOMO EMBUCHADO DE CEBO DE CAMPO 50% RAZA IBÉRICA',
      type: 'embutidos',
      price: 43,
      available: 15,
      offer: 12,
      id: 13,
      image: 'http://www.montesierra.com/image/cache/data/productos/LOMO-EMBUCHADO-IBERICO-600x600.jpg',
      tags: 'Martín Hierro, lomo, embuchado, bellota, ibérico'.split(', '),
    },
    {
      name: 'FUET DE SOLOMILLO IBÉRICO MONTESIERRA',
      type: 'embutidos',
      price: 6,
      available: 7,
      offer: 0,
      id: 8,
      image: 'http://www.montesierra.com/image/cache/data/productos/fuet-solomillo-600x600.jpg',
      tags: 'Montesierra, fuet, solomillo, ibérico'.split(', '),
    },
  ];

  private search_Params: SearchParam

  constructor() { }

  getProduct(id: number | string): Observable<Product> {
    this.products.forEach(product => {
      if (product.id === id) {
        return of(product);
      }
    })

    return of(null);
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  listProduct(term: string, range: string): Observable<Product[]> {
    console.log(term)
    const list: Product[] = [];
    let added: boolean = false;
    const params: SearchParam = {
      lower_price: 0,
      max_price: 0
    };

    this.getProducts().subscribe(products => {
      params.lower_price = products[0].price;
      params.max_price = products[0].price;
      params.tags = products[0].tags;
      if (range.toLowerCase() === 'todo') {
        params.kind = [products[0].type];
      }
      products.forEach(product => {
        term.toLowerCase().split(' ').forEach(nm => {
          if (range.toLowerCase() != 'todo' && product.type.toLowerCase() != range.toLowerCase()) {
            added = true;
          }
          if (added === false) {
            product.type.toLowerCase().split(' ').forEach(word => {
              if (nm === word) {
                list.push(product);
                added = true;
              }
            })
          }
        });
        product.name.toLowerCase().split(' ').forEach(word => {
          term.toLowerCase().split(' ').forEach(nm => {
            if (added === false) {
              if (nm === word) {
                list.push(product);
                added = true;
              }
            }
          })
        });
        product.tags.forEach(tag => {
          tag.toLowerCase().split(' ').forEach(word => {
            term.toLowerCase().split(' ').forEach(nm => {
              if (added === false) {
                if (word === nm) {
                  list.push(product);
                  added = true;
                }
              }
            })
          })
          let count: number = 0;
          params.tags.forEach(param_tag => {
            if (tag.toLowerCase() === param_tag.toLowerCase()) {
              count++;
            }
          });
          if (count === 0) {
            params.tags.push(tag);
          }
        });
        if (product.origin) {
          if (added === false) {
            product.origin.toLowerCase().split(' ').forEach(word => {
              term.toLowerCase().split(' ').forEach(nm => {
                if (nm.toLowerCase() === word.toLowerCase()) {
                  list.push(product);
                  added = true;
                }
              })
            })
          }
        }
        if (range.toLowerCase() === 'todo') {
          let count: number = 0;
          params.kind.forEach(cat => {
            if (product.type === cat) {
              count++;
            }
          });
          if (count === 0) {
            params.kind.push(product.type);
          }
        }
        if (added === true) {
          if (product.price < params.lower_price) {
            params.lower_price = product.price;
          }

          if (product.price > params.lower_price) {
            params.max_price = product.price;
          }
        }
        added = false;
      });
    })
    this.setSearchParams(params);
    return of(list);
  }

  private setSearchParams(options?: SearchParam): void {
    this.search_Params = options;
  }
  getSearchParams(): SearchParam {
    return this.search_Params;
  }
}
