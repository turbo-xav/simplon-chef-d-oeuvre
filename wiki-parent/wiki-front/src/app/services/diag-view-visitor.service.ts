import { Environment } from '../models/environment';

import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

import { Layer } from '../models/layer';
import { Observable } from '../../../node_modules/rxjs/Observable';



@Injectable()
export class DiagViewVisitorService {

    private restUrl = AppConfig.settings.apiBack.restUrl + '/diagnosticView';

    constructor(private http: HttpClient) { }


}



