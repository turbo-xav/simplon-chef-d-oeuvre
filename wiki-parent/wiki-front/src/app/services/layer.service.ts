import { Injectable } from '@angular/core';

@Injectable()
export class LayerService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/role';
  constructor() { }

}
