import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private uid: string;
  user: Observable<User>;
  constructor(
    private route: ActivatedRoute,
    private users: UserService
  ) { }

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.user = this.users.getUser(this.uid);
  }

}
