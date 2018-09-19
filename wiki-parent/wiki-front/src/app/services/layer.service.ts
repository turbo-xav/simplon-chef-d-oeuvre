import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';

@Injectable()
export class LayerService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/role';
  constructor() { }

}
