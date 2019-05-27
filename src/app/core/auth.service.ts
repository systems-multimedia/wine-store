import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';
import { UserService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  checkLog(data: { email: string, password: string }) {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        if (data.email.toLowerCase() === user.email.toLowerCase() && data.password === user.password) {
          return this.login().pipe(
            finalize(() => {
              if (this.redirectUrl) {
                this.router.navigate[this.redirectUrl];
              }
            })
          );
        } else {
          return of(false);
        }
      });
    });
  }

  signUp(data: User) {
    return this.userService.create(data);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}