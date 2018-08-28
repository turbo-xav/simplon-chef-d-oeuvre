import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Subject } from 'rxjs/Subject';
import {restRootUrl , httpJsonOptions} from '../config/config';



@Injectable()
export class AuthService {

  private restUrl = restRootUrl + '/auth';

  authUser: User = null;

  authUserSubject = new Subject<User>();

  public getAuthUserSubject(): Subject<User> {
    return this.authUserSubject;
  }

  constructor(private http: HttpClient) {

  }

  public auth(uid: string, password: string): boolean {

    const user: User = new User(null, uid, 'Xavier', 'Tagliarino', 'xavier.tagliarino@gmail.com', password, true, true);
    user.setRole(new Role(1, 'Admin'));
    this.authUser = user;
    this.authUserSubject.next(this.getAuthInfos());

    /*console.log(user);
   const user1 = {
     username: 'admin',
     password: 'root123'
    };

   let headers = new HttpHeaders();
   headers = headers.append('Authorization', 'Basic ' + btoa('username:password'));
   headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

   this.http.post<any>(this.restUrl + '/login', user1, {headers: headers}).subscribe(response => {
         console.log(response);
   }, err => {
      console.log('User authentication failed!');
   });*/

    return true;
  }

  isAuth() {
    return this.authUser !== null;
  }

  getAuthInfos() {
    return this.authUser;

  }

  logOut() {
    this.authUser = null;
    this.authUserSubject.next(this.getAuthInfos());
    /*const headers: HttpHeaders = new HttpHeaders( {
      'Authrization': 'basic: logout',
    });
    this.http.get(this.restUrl + '/logout', { headers: headers } ).subscribe(
      () => {
        this.authUser = null;
        this.authUserSubject.next(this.getAuthInfos());
      },
      (error) => {
        console.log(error);
      }
    );*/

  }

}
