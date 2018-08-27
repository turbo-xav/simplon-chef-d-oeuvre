import { HttpClient } from '@angular/common/http';
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

  auth(uid: string, password: string): boolean {

    const user: User = new User(null, uid, 'Xavier', 'Tagliarino', 'xavier.tagliarino@gmail.com', password, true, true);
    user.setRole(new Role(1, 'Admin'));
    this.authUser = user;
    this.authUserSubject.next(this.getAuthInfos());
    /*this.http.post<User>(this.restUrl + '/auth', user, httpJsonOptions).subscribe(
      (response) => {
        this.authUser = user;
        this.authUser.role = new Role(1, 'Admin');
        this.authUserSubject.next(this.getAuthInfos());
      },
      (error) => {
        console.log(error);
      }
    );*/
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
  }

}
