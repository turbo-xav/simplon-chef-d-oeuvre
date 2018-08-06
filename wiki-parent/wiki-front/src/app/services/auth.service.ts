import { Injectable } from '@angular/core';
import User from '../business/user';

@Injectable()
export class AuthService {

  constructor() { }

  auth(login: String, password: String): User {
    return new User('Xavier', 'Tagliarino');
  }

  logOut() {
  }

}
