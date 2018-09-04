import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Guideline } from '../models/guideline';
import { AppConfig } from '../app.config';

@Injectable()
export class GuidelineService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guideline';

  constructor(private http: HttpClient) { }

  public saveGuideline(guideline: Guideline): Observable<Guideline> {
    if (guideline.id != null) {
      return this.http.put<Guideline>(this.restUrl, guideline);
    } else {
      return this.http.post<Guideline>(this.restUrl, guideline);
    }
  }

  public getGuidelines(): Observable<Guideline[]> {
    return this.http.get<Guideline[]>(this.restUrl);
  }

  public getGuideline(id: number): Observable<Guideline> {
    return this.http.get<Guideline>(this.restUrl + '/' + id);
  }

  public deleteGuideline(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}

