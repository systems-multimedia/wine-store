import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';
import { UserService } from './user-service.service';
import { User } from '../model/user';

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

  private products: Product[] = [
    {
      name: 'Aberlour Single Malt 12 Años',
      type: 'licores',
      price: 1850,
      deliver: 2,
      available: 12,
      offer: 10,
      id: '1',
      image: 'https://i0.wp.com/thewine.com.uy/wp-content/uploads/2018/08/whi_esc-sin_mal-f24.jpg?fit=750%2C750',
      tags: 'Whisky, Whisky Escocés, Whisky Escocés Single Malt'.split(', '),
      origin: 'escocés',
      quant: 700,
      unit: 'ml',
      comments: [
        {
          username: 'german_g',
          email: 'g.garmendia@gmail.com',
          rating: 5,
          comment: 'En su punto, gran calidad y a buen precio! Recomendado!'
        }
      ]
    },
    {
      name: 'Alamos Cabernet Sauvignon',
      type: 'licores',
      price: 390,
      deliver: 2,
      available: 10,
      offer: 0,
      id: '2',
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750,
      unit: 'ml'
    },
    {
      name: 'Saint Felicien Malbec',
      type: 'licores',
      price: 620,
      deliver: 2,
      available: 8,
      offer: 12,
      id: '3',
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750,
      unit: 'ml',
      comments: [
        {
          username: 'pedro123',
          email: 'petergomes@gmail.com',
          rating: 4,
          comment: 'Buena cosecha, excelente para una reunión'
        }
      ]
    },
    {
      name: 'Alamos Chardonnay',
      type: 'licores',
      price: 390,
      deliver: 2,
      available: 20,
      offer: 0,
      id: '4',
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f08.jpg?fit=750%2C750',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750,
      unit: 'ml'
    },
    {
      name: 'Alamos Malbec',
      type: 'licores',
      price: 390,
      deliver: 2,
      available: 12,
      offer: 8,
      id: '5',
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f07.jpg?fit=750%2C750',
      tags: 'Catena Zapata, Vinos, Vinos Importados, vino'.split(', '),
      origin: 'argetina',
      quant: 750,
      unit: 'ml',
      comments: [
        {
          username: 'pedro123',
          email: 'petergomes@gmail.com',
          rating: 4,
          comment: 'Buena cosecha, excelente para una reunión'
        }
      ]
    },
    {
      name: 'Alta Gama Dinastia',
      type: 'licores',
      price: 1340,
      deliver: 2,
      available: 22,
      offer: 18,
      id: '6',
      image: 'https://i0.wp.com/thewine.com.uy/wp-content/uploads/2018/08/vin_nac-h_sta-f06.jpg?fit=750%2C750',
      tags: 'H. Stagnari, Vinos Nacionales, Dinastia, Tinto, vino'.split(', '),
      origin: 'uruguay',
      quant: 750,
      unit: 'ml'
    },
    {
      name: 'Alta Reserva Malbec Rosé',
      type: 'licores',
      price: 290,
      deliver: 2,
      available: 5,
      offer: 0,
      id: '7',
      image: 'https://i2.wp.com/thewine.com.uy/wp-content/uploads/2018/10/vin_imp-cat_zap-f06.jpg?fit=450%2C450',
      tags: 'Gimenez Mendez, Vinos Nacionales, Malbec Rosé, Rosado, vino'.split(', '),
      origin: 'uruguay',
      quant: 750,
      unit: 'ml'
    },
    {
      name: 'MORCILLA ACHORIZADA IBÉRICA',
      type: 'embutidos',
      price: 3.6,
      deliver: 2,
      available: 20,
      offer: 0,
      id: '8',
      image: 'http://www.montesierra.com/image/cache/data/productos/morcilla-achorizada-600x600.jpg',
      tags: 'Montesierra, morcilla, chorizo'.split(', '),
    },
    {
      name: 'SALCHICHÓN CULAR IBÉRICO BELLOTA',
      type: 'embutidos',
      price: 11,
      deliver: 2,
      available: 6,
      offer: 8,
      id: '9',
      image: 'http://www.montesierra.com/image/cache/data/productos/foto6-600x600.jpg',
      tags: 'salchichón'.split(', '),
      unit: 'g'
    },
    {
      name: 'SALCHICHÓN EXTRA IBÉRICO',
      type: 'embutidos',
      price: 6,
      deliver: 2,
      available: 9,
      offer: 0,
      id: '10',
      image: 'http://www.montesierra.com/image/cache/data/productos/SALCHICHON-EXTRA-IBERICO-600x600.jpg',
      tags: 'salchichón, ibérico'.split(', '),
      unit: 'g'
    },
    {
      name: 'CHORIZO IBÉRICO SERRANITO MONTESIERRA',
      type: 'embutidos',
      price: 4,
      deliver: 2,
      available: 17,
      offer: 30,
      id: '11',
      image: 'http://www.montesierra.com/image/cache/data/productos/chorizo-serranito-600x600.jpg',
      tags: 'Montesierra, chorizo, ibérico'.split(', '),
      unit: 'g'
    },
    {
      name: 'LOMO EMBUCHADO DE BELLOTA IBÉRICO 100% IBÉRICO MARTÍN HIERRO',
      type: 'embutidos',
      price: 50,
      deliver: 2,
      available: 23,
      offer: 20,
      id: '12',
      image: 'http://www.montesierra.com/image/cache/data/productos/lomo_iberico_bellota-600x600.jpg',
      tags: 'Martín Hierro, lomo, embuchado, bellota, ibérico'.split(', '),
      unit: 'g'
    },
    {
      name: 'LOMO EMBUCHADO DE CEBO DE CAMPO 50% RAZA IBÉRICA',
      type: 'embutidos',
      price: 43,
      deliver: 2,
      available: 15,
      offer: 12,
      id: '13',
      image: 'http://www.montesierra.com/image/cache/data/productos/LOMO-EMBUCHADO-IBERICO-600x600.jpg',
      tags: 'Martín Hierro, lomo, embuchado, bellota, ibérico'.split(', '),
      unit: 'g',
      comments: [
        {
          username: 'Oscar',
          email: 'operez@gmail.com',
          rating: 5,
          comment: 'Muy bueno! mi familia y yo quedamos satisfechos. Recomando!'
        }
      ]
    },
    {
      name: 'FUET DE SOLOMILLO IBÉRICO MONTESIERRA',
      type: 'embutidos',
      price: 6,
      deliver: 2,
      available: 7,
      offer: 0,
      id: '14',
      image: 'http://www.montesierra.com/image/cache/data/productos/fuet-solomillo-600x600.jpg',
      tags: 'Montesierra, fuet, solomillo, ibérico'.split(', '),
      unit: 'g',
      comments: [
        {
          username: 'Pablo Mendoza',
          email: 'pmendoza@gmail.com',
          rating: 5,
          comment: 'Producto de gran calidad, satisfecho con mi compra. 100% Recomendado'
        },
        {
          username: 'Ignacio Garmendia',
          email: 'garmendia@gmail.com',
          rating: 3,
          comment: 'Buen producto, un poco salado'
        },
      ]
    },
  ];

  private search_Params: SearchParam;
  private ordersCount: number = 0;
  constructor(
    private user: UserService
  ) {
    // localStorage.setItem('cartItems', '');
    if (!JSON.parse(localStorage.getItem('products'))) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  getProduct(id: string): Observable<Product> {
    let product: Product;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        product = this.products[i];
      }
    }
    return of(product);
  }

  getProducts(): Observable<Product[]> {
    return of(JSON.parse(localStorage.getItem('products')));
  }

  getSection(section: string): Observable<Product[]> {
    let list: Product[] = [];
    this.getProducts().subscribe(products => {
      products.forEach(product => {
        if (section.toLowerCase() === product.type.toLowerCase()) {
          list.push(product);
        }
      })
    });
    return of(list);
  }

  getSections(): string[] {
    let sections: string[];
    this.getProducts().subscribe(products => {
      sections = [products[0].type.toLowerCase()];
      products.forEach(product => {
        let count: number = 0;
        sections.forEach(section => {
          if (section.toLowerCase() === product.type.toLowerCase()) {
            count++;
          }
        });
        if (count === 0) {
          sections.push(product.type.toLowerCase());
        }
      })
    })
    return sections;
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
  getOffers(): Observable<Product[]> {
    let list: Product[] = [];
    this.getProducts().subscribe(products => {
      products.forEach(product => {
        if (product.offer > 0) {
          list.push(product);
        }
      })
    })

    return of(list);
  }

  addToCart(data: { product: Product, quant: number }) {
    if (this.user.getUID()) {
      return this.user.addOrder(data);
    }
    let orders: Array<{
      product: Product,
      quant: number
    }>;
    if (localStorage.getItem('cartItems').length > 0) {
      let added: boolean = false;
      orders = JSON.parse(localStorage.getItem('cartItems'));
      for(let i = 0; i<orders.length; i++) {
        if(orders[i].product.id === data.product.id) {
          console.log('igual')
          if(orders[i].quant + data.quant <= orders[i].product.available) {
            orders[i].quant += data.quant;
          } else {
            orders[i] = data;
          }
          added = true;
        }
      }
      if(added === false) {
        orders.push(data);
        this.ordersCount++;
      }
    } else { 
      orders = [data];
      this.ordersCount++;
    }
    console.log(orders);
    alert('Producto incluido satisfactoriamente');
    return localStorage.setItem('cartItems', JSON.stringify(orders));
  }

  getOrders(): Observable<Array<{
    product: Product,
    quant: number
  }>> {
    return this.user.getOrders();
  }

  getOrdersCount(): number {
    return this.ordersCount;
  }

  deleteOrder(id: string): Observable<Array<{
    product: Product,
    quant: number
  }>> {
    let usr: User;
    if(this.user.getUID()) {
      this.user.getUsers().subscribe(users => {
        if(users) {
          let number: string = '';
          this.user.getUID().split('u').forEach(char => {
            number = number + char;
          })
          users[Number(number)-1].order.forEach(order => {
            if(order && (order.product.id === id)) {
              order = null;
            }
          })
          usr = users[Number(number)-1];
          localStorage.setItem('users', JSON.stringify(users))
          return of(usr.order);
        }
      })
    } else {
      let array = JSON.parse(localStorage.getItem('cartItems')) as Array<{product: Product, quant: number}>;
      for(let i = 0; i< array.length; i++) {
        if(array[i].product.id == id) {
          let temp = array[array.length - 1];
          array[array.length - 1] = array[i];
          array[i] = temp;
          array.pop();
        }
      }
      console.log(array as Array<{
        product: Product,
        quant: number
      }>)
      localStorage.setItem('cartItems', JSON.stringify(array));
      return of(array);
    }
  }
}
