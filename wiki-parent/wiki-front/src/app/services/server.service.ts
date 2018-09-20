import { Server } from './../models/server';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class ServerService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/server';

  constructor(private http: HttpClient) { }


  public saveServer(server: Server): Observable<Server> {
    if ( server.id != null ) {
      return  this.http.put<Server>(this.restUrl, server, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    } else {
      return  this.http.post<Server>(this.restUrl, server, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

  public getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.restUrl);
  }

  public getServer(id: number): Observable<Server> {
    return this.http.get<Server>(this.restUrl + '/' + id);
  }

  public deleteServer(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }
}

