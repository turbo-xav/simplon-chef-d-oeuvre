import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Guideline } from '../models/guideline';

@Injectable()
export class GuidelineService {


  constructor(private http: HttpClient) { }

public getGuidelines(): Observable<Guideline[]> {
 return this.http.get<Guideline[]>('http://localhost:8080/wiki-back/rest/guideline');
}

}
