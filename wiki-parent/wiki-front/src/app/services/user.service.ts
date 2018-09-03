import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class UserService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/user';

  constructor(private http:  HttpClient) { }

  public createAccount(user: User): Observable<User> {
    return  this.http.post<User>(this.restUrl + '/account', user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
  }

  public saveUser(user: User): Observable<User> {
    if ( user.id != null ) {
      return  this.http.put<User>(this.restUrl, user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    } else {
      return  this.http.post<User>(this.restUrl, user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
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
