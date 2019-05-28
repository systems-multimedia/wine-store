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
    if(!JSON.parse(localStorage.getItem('users'))) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  setUID(uid: string) {
    this.currentUid = uid;
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
      user.order.push(data);
      this.getUsers().subscribe(users => {
        users[Number(user.uid.slice(1, user.uid.length - 1))] = user;
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

    order = JSON.parse(localStorage.getItem('cartItems'));
    return of(order);
  }


}
