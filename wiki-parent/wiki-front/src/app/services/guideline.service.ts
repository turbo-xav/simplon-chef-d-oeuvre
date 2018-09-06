import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Guideline } from '../models/guideline';
import { AppConfig } from '../app.config';

@Injectable()
export class GuidelineService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/guideline';

  constructor(private http: HttpClient) { }

  public saveGuideline(guideline: Guideline): Observable<Guideline> {
    if (guideline.id != null) {
      return this.http.put<Guideline>(this.restUrl, guideline);
    } else {
      return this.http.post<Guideline>(this.restUrl, guideline);
    }
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

  public upload(file) {
    console.log(file);
    
    //const urlFileUpload = 'https://api.cloudinary.com/v1_1/dfexmhgqi/image/upload';
    const urlFileUpload = 'http://localhost:8080/wiki-back/rest/upload';
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('monParam', 'xavier is the best');
    
   // const guideline = new Guideline(1, 'test', 'file', 'tech', 'desc');
   // formData.append('guideline', JSON.stringify(guideline));

    const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');

    this.http.post(urlFileUpload, formData).subscribe( () => { console.log('upload'); } );
    //return this.http.post<any>(urlFileUpload, formData).subscribe( () => { console.log('upload'); } );
  }

}

