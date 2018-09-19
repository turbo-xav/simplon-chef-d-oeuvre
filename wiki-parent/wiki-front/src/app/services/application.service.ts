import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Application } from '../models/application';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class ApplicationService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/application';

  constructor(private http: HttpClient) { }


  public saveAppli(application: Application): Observable<Application> {
    if (application.id != null) {
      return this.http.put<Application>(this.restUrl, application, { headers: new HttpHeaders(AppConfig.settings.apiBack.jsonHeaders) });
    } else {
      return this.http.post<Application>(this.restUrl, application, { headers: new HttpHeaders(AppConfig.settings.apiBack.jsonHeaders) });
    }
  }

  public getApplications(): Observable<Application[]> {
    return this.http.get<Application []>(this.restUrl);
  }

  public getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(this.restUrl + '/' + id);
  }

public deleteApplication(id: number) {
return this.http.delete(this.restUrl + '/' + id);
}
}
