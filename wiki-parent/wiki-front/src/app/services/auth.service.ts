import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Subject } from 'rxjs/Subject';
import {restRootUrl , httpJsonOptions} from '../config/config';



@Injectable()
export class AuthService {

  private restUrl = restRootUrl + '/user';


  authUserSubject = new Subject<User>();

  public getAuthUserSubject(): Subject<User> {
    return this.authUserSubject;
  }

  constructor(private http: HttpClient) { }

  public auth(uid: string, password: string): boolean {

    const user: User = new User(null, uid, 'Xavier', 'Tagliarino', 'xavier.tagliarino@gmail.com', password, true, true);
    user.setRole(new Role(1, 'Admin'));
    sessionStorage.setItem('authUser', JSON.stringify( user));
    this.authUserSubject.next(this.getAuthInfos());
    return this.isAuth();
    }

  isAuth(): boolean {
    return (sessionStorage.getItem('authUser') != null);
  }

  getAuthInfos(): User {
    return JSON.parse(sessionStorage.getItem('authUser'));
  }

  logOut(): void {
    sessionStorage.clear();
    this.authUserSubject.next(this.getAuthInfos());
  }
}
