import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Diagnostic } from '../models/diagnostic';
import { Environment } from '../models/environment';
import { Layer } from '../models/layer';

import { Application } from '../models/application';
import { Server } from '../models/server';

@Injectable()
export class DiagViewVisitorService {

    private restUrl = AppConfig.settings.apiBack.restUrl + '/diagnostic-visitor';

    constructor(private http: HttpClient) { }

    public getDiagnosticsWithParameters(appId: string, envId: string, layerId: string, serverId: string): Observable<Diagnostic[]> {
        return this.http.get<Diagnostic[]>(
          this.restUrl
          + '/getDiagnosticsWithParameters?appId=' + appId + '&envId=' + envId + '&layerId=' + layerId + '&serverId=' + serverId
          );
    }

    public getApplications(): Observable<Application[]> {
        return this.http.get<Application[]>(this.restUrl + '/application');
    }

    public getEnvironments(): Observable<Environment[]> {
        return this.http.get<Environment[]>(this.restUrl + '/environment');
    }

    public getEnvironnements(applicationId: number) {
        return this.http.get<Environment[]>(this.restUrl + '/getEnvironnmentsByApplication/' + applicationId);
    }    

    public getLayers(): Observable<Layer[]> {
        return this.http.get<Layer[]>(this.restUrl + '/layer');
      }

    public getServers(): Observable<Server[]> {
        return this.http.get<Server[]>(this.restUrl + '/server');
    }

    public getLayersByEnviron(id: number): Observable<Layer[]> {
        return this.http.get<Layer[]>(this.restUrl + '/getLayersByEnviron/' + id);
    }

       // récupérer les servers de la layer
    public getServersByLayer(id: number): Observable<Server[]> {
        return this.http.get<Server[]>(this.restUrl + '/getServersByLayer/' + id);
    }

    // récupérer les diag du server
    public getDiagnosticsByServer(id: number): Observable<Diagnostic[]> {
        return this.http.get<Diagnostic[]>(this.restUrl + '/getDiagnosticsByServer/' + id);
    }



}



