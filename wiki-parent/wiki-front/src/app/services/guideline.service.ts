import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Guideline } from '../models/guideline';
import { AppConfig } from '../app.config';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class GuidelineService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guideline';

  constructor(private http: HttpClient) { }

  public saveGuideline(guideline: Guideline, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    console.log(JSON.stringify(guideline));
    formData.append('guideline', JSON.stringify(guideline));
    console.log('guideline', guideline);
    return this.http.post<Observable<any>>(this.restUrl + '/upload', formData);

    // const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    /*if (guideline.id != null) {
      return this.http.put<Guideline>(this.restUrl, guideline);
    } else {
      return this.http.post<Guideline>(this.restUrl, guideline);
    }*/
  }

  public getDownloadUrl(guideline: Guideline): String {
    return this.restUrl + '/download/' + guideline.id;
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

