import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.signupForm = {
      username: '',
      password: '',
    };
  }

  onSubmit() {
    console.log(this.signupForm);
    // this.userService.signup(this.signupForm);
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

}
