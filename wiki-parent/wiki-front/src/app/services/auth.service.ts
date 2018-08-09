import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable()
export class AuthService {

  authUser: User = null;

  constructor() {

  }

  auth(login: String, password: String): boolean {
    this.authUser = new User('Xavier', 'Tagliarino');
    this.authUser.role = new Role(1,'Admin');
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
  }

}
