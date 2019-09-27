import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public return = '';
  private url = 'http://127.0.0.1:8000/api/login';
  private httpOptions;
  constructor(private http: HttpClient,
              private router: Router,
              private storage: StorageService,
              private route: ActivatedRoute) { }

  public login(userData) {
    this.route.queryParams
      .subscribe(params => this.return = params['returnUrl'] || '/home');
    this.http.post<any>(this.url, userData).subscribe(
      data => {
        console.log('Success!', data);
        this.storage.storeUser(data.user);
        console.log(this.storage.getUser());
        this.storage.storeToken(data.token);
        console.log(this.storage.getToken());
        this.router.navigateByUrl(this.return);
      },
      error => {
        console.error('Error!', error);
        alert('Invalid Username or Password');
      }
    );
  }

  public logout(id: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'token ' + this.storage.getToken()
      })
    };
    // console.log(this.storage.getToken());
    // console.log('http://127.0.0.1:8000/api/logout/' + id);
    // console.log(this.httpOptions);
    this.http.get('http://127.0.0.1:8000/api/logout/' + id, this.httpOptions).subscribe(
      data => {
        console.log('Success!', data);
        this.storage.removeToken();
        this.storage.removeUser();
      },
      error => {
        console.error('Error!', error);
      });
  }

  public signup(userData) {
    console.log('Start signup');
    console.log(userData);
    return this.http.post<any>('http://127.0.0.1:8000/api/signup', userData);

  }
}
