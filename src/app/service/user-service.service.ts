import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      name: 'Raul',
      lname: 'Moncada',
      uid: 'u1',
      email: 'rmoncada@gmail.com',
      username: 'rmoncada123',
      password: 'password'
    },
    {
      name: 'Sam',
      lname: 'Boada',
      uid: 'u2',
      email: 'samuelboada@gmail.com',
      username: 'sboada',
      password: 'password'
    },
  ];
  private user: Observable<User>;
  private currentUid: string;
  constructor() {
    // localStorage.setItem('users', '');
    if(!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  setUID(uid: string) {
    this.currentUid = uid;
    console.log(this.currentUid);
  }

  getUID() {
    return this.currentUid;
  }

  create(user: User) {
    const users = JSON.parse(localStorage.getItem('users'));
    user.uid = `u${users.length}`;
    users.push(user);
    return localStorage.setItem('users', JSON.stringify(users));
  }

  getUser(uid: string): Observable<User> {
    this.getUsers().subscribe(users => {
      users.forEach(user => {
        if (uid === user.uid) {
          this.user = of(user);
        }
      })
    });
    return this.user;
  }

  getUsers(): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('users')));
  }

  addOrder(data: { product: Product, quant: number }) {
    this.getUser(this.currentUid).subscribe(user => {
      if(user.order) {
        user.order.push(data);
      } else {
        user.order = [data];
      }
      this.getUsers().subscribe(users => {
        let number_id: string = '';
        user.uid.split('u').forEach(char => {
          number_id = number_id + char;
        });
        users[Number(number_id) - 1] = user;
        console.log(Number(number_id));
        return localStorage.setItem('users', JSON.stringify(users));
      })
    })
  }

  getOrders(): Observable<Array<{
    product: Product,
    quant: number
  }>> {
    let order: Array<{
      product: Product,
      quant: number
    }>;
    if (this.currentUid) {
      this.getUser(this.currentUid).subscribe(user => {
        order = user.order;
      })
      return of(order);
    }

    if(localStorage.getItem('cartItems').length > 0) {
      order = JSON.parse(localStorage.getItem('cartItems'));
    }
    return of(order);
  }


}
