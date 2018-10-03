import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Guideline } from '../models/guideline';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GuidelineViewService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guideline-visitor';

  constructor(private http: HttpClient) { }

  public getDownloadUrl(guideline: Guideline): String {
    return this.restUrl + '/download/' + guideline.id;
  }

  public getGuidelines(): Observable<Guideline[]> {
    return this.http.get<Guideline[]>(this.restUrl);
  }


}
