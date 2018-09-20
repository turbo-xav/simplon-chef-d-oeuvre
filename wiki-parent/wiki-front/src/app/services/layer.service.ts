import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Layer } from '../models/layer';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Server } from '../models/server';


@Injectable()
export class LayerService {


  private restUrl = AppConfig.settings.apiBack.restUrl + '/layer';

  constructor(private http:  HttpClient) { }

  public saveLayer(layer: Layer): Observable<Layer> {
    if ( layer.id != null ) {
      return  this.http.put<Layer>(this.restUrl, layer, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    } else {
      return  this.http.post<Layer>(this.restUrl, layer, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }
  public getLayers(): Observable<Layer[]> {
    return this.http.get<Layer[]>(this.restUrl);
  }


  public getLayer(id: number): Observable<Layer> {
    return this.http.get<Layer>(this.restUrl + '/' + id);
  }

  // récupérer les servers de la layer
  public getServersByLayer(id: number): Observable<Server[]> {
    return this.http.get<Server[]>(this.restUrl + '/getServersByLayer/' + id);
  }


  public deleteLayer(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }
}
