import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GuidelineViewService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guidelineFonctionnel';

  constructor() { }


}
