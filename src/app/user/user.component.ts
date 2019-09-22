import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public loginForm;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: '',
    };
  }

  onSubmit() {
    console.log(this.loginForm);
    this.userService.login(this.loginForm);
  }

  onLogout() {
    this.userService.logout();
  }
}
