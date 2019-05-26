import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';

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
  constructor() { }

  create(user: User) {
    user.uid = `u${this.users.length}`;
    return this.users.push(user);
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
    return of(this.users);
  }


}
