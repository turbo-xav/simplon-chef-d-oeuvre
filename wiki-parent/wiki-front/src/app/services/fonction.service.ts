import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Fonction } from '../models/fonction';

@Injectable()
export class FonctionService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/function';

  constructor(private http:  HttpClient) {
  }

  public saveFonction(fonction: Fonction): Observable<Fonction> {
    if ( fonction.id != null ) {
      return  this.http.put<Fonction>(this.restUrl, fonction,  { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) }  );
    } else {
      return  this.http.post<Fonction>(this.restUrl, fonction, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

  public getFonctions(): Observable<Fonction[]> {
    return this.http.get<Fonction[]>(this.restUrl);
  }

  public getFonction(id: number): Observable<Fonction> {
    return this.http.get<Fonction>(this.restUrl + '/' + id);
  }

  public deleteFonction(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}
