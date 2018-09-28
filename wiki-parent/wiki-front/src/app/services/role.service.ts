import { environment } from '../../environments/environment.prod';
import { AppConfig } from '../app.config';
import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/role';

  constructor(private http:  HttpClient) {
  }

  public saveRole(role: Role): Observable<Role> {
    if ( role.id != null ) {
      return  this.http.put<Role>(this.restUrl, role,  { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) }  );
    } else {
      return  this.http.post<Role>(this.restUrl, role, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
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
