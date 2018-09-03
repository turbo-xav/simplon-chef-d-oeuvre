import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Guideline } from '../models/guideline';
import { AppConfig } from '../app.config';

@Injectable()
export class GuidelineService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guideline';

  constructor(private http: HttpClient) { }

public getGuidelines(): Observable<Guideline[]> {
 return this.http.get<Guideline[]>(this.restUrl);
}

}
