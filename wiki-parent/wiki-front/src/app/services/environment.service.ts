import { Environment } from './../models/environment';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Layer } from '../models/layer';

@Injectable()
export class EnvironmentService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/environment';

  constructor(private http: HttpClient) { }


  public saveEnv(environment: Environment): Observable<Environment> {
    if (environment.id != null) {
      return this.http.put<Environment>(this.restUrl, environment, { headers: new HttpHeaders(AppConfig.settings.apiBack.jsonHeaders) });
    } else {
      return this.http.post<Environment>(this.restUrl, environment, { headers: new HttpHeaders(AppConfig.settings.apiBack.jsonHeaders) });
    }
  }

public getEnvironments(): Observable<Environment[]> {
  return this.http.get<Environment[]>(this.restUrl);
}
public getEnvironment(id: number): Observable<Environment> {
  return this.http.get<Environment>(this.restUrl + '/' + id);
}

public deleteEnvironment(id: number) {
return this.http.delete(this.restUrl + '/' + id);
}

public getLayersByEnviron(id: number): Observable<Layer[]> {
  return this.http.get<Layer[]>(this.restUrl + '/getLayersByEnviron/' + id);
}

}
