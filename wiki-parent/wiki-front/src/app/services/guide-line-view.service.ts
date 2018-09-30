import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class GuideLineViewService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guidelineView';

  constructor(private http: HttpClient) { }

}
