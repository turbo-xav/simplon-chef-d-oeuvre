import { Injectable } from '@angular/core';
import {restRootUrl , httpJsonOptions} from '../config/config';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  restUrl = restRootUrl + '/user';

  constructor(private http:  HttpClient) { }

  public saveUser(user: User): Observable<User> {
    if ( user.id != null ) {
      return  this.http.post<User>(this.restUrl, user, httpJsonOptions);
    } else {
      return  this.http.put<User>(this.restUrl, user, httpJsonOptions);
    }
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.restUrl);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.restUrl + '/' + id);
  }

  public deleteUser(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }


}
