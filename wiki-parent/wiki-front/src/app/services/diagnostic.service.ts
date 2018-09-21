import { Diagnostic } from './../models/diagnostic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { AppConfig } from '../app.config';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class DiagnosticService {


  private restUrl = AppConfig.settings.apiBack.restUrl + '/diagnostic';

  constructor(private http:  HttpClient) { }



  public saveDiagnostic(diagnostic: Diagnostic): Observable<Diagnostic> {
    if ( diagnostic.id != null ) {
      return  this.http.put<Diagnostic>(this.restUrl, diagnostic, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    } else {
      return  this.http.post<Diagnostic>(this.restUrl, diagnostic, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

  public getDiagnostics(): Observable<Diagnostic[]> {
    return this.http.get<Diagnostic[]>(this.restUrl);
  }

  public getDiagnostic(id: number): Observable<Diagnostic> {
    return this.http.get<Diagnostic>(this.restUrl + '/' + id);
  }

  public deleteDiagnostic(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}
