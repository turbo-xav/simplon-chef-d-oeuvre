import { Injectable } from '@angular/core';
import User from '../business/user';

@Injectable()
export class ServiceAuthService {

  private user: User = null;

  constructor() { }

  auth(login: String, password: String): User {

  }

  isAuth(): boolean {
    return (this.user != null);
  }

  logOut() {
    this.user = null;
  }

}
