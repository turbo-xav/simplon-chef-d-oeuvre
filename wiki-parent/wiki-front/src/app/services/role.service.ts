import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {restRootUrl , httpJsonOptions} from '../config/config';


@Injectable()
export class RoleService {

  restUrl = restRootUrl + '/role';


  constructor(private http:  HttpClient) { }

  public saveRole(role: Role): Observable<Role> {
    if ( role.id != null ) {
      return  this.http.put<Role>(this.restUrl, role, httpJsonOptions);
    } else {
      return  this.http.post<Role>(this.restUrl, role, httpJsonOptions);
    }
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.restUrl);
  }

  public getRole(id: number): Observable<Role> {
    return this.http.get<Role>(this.restUrl + '/' + id);
  }

  public deleteRole(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}
