import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Member } from '../models/member';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MemberService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/member';

  constructor(private http:  HttpClient) {
  }

  public saveMember(member: Member): Observable<Member> {
    if ( member.id != null ) {
      return  this.http.put<Member>(this.restUrl, member,  { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) }  );
    } else {
      return  this.http.post<Member>(this.restUrl, member, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

  public getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.restUrl);
  }

  public getMember(id: number): Observable<Member> {
    return this.http.get<Member>(this.restUrl + '/' + id);
  }

  public deleteMember(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}
