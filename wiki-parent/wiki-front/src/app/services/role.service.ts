import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';



@Injectable()
export class RoleService {

  restUrl = 'http://localhost:8080/wiki-back/rest/role';

  httpOptions = {
    headers: new HttpHeaders( {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
  };

  constructor(private http:  HttpClient) { }

  public addRole(role: Role): Observable<Role> {
    return  this.http.post<Role>(this.restUrl, this.httpOptions);
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.restUrl);
  }

}
