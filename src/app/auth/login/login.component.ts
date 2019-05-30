import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  dataError: boolean = false;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login({value, valid}: {value: {email: string, password: string}, valid: boolean}) {
    if(!valid) {
      alert('Información Errónea');
    } else {
      this.auth.checkLog(value).subscribe(error => {
        this.dataError = error;
      })
    }
  }

}
