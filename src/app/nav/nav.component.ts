import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public userId;
  constructor(private user: UserService, private storage: StorageService) {}

  ngOnInit() {
  }
  logout() {
    this.userId = this.storage.getUser()['id'];
    console.log(this.userId);
    this.user.logout(this.userId);
  }
}
