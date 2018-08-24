import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  authUser: User = null;

  authUserSubject = new Subject<User>();

  public getAuthUserSubject(): Subject<User> {
    return this.authUserSubject;
  }

  constructor() {

  }

  auth(login: String, password: String): boolean {
    this.authUser = new User(1, 'Xavier', 'Tagliarino', '', '', '', true, true);
    this.authUser.role = new Role(1, 'Admin');
    this.authUserSubject.next(this.getAuthInfos());
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
