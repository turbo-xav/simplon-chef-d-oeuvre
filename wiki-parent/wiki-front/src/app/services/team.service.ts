import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../models/team';

@Injectable()
export class TeamService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/team';

  constructor(private http:  HttpClient) {
  }

  public saveTeam(team: Team): Observable<Team> {
    if ( team.id != null ) {
      return  this.http.put<Team>(this.restUrl, team,  { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) }  );
    } else {
      return  this.http.post<Team>(this.restUrl, team, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.restUrl);
  }

  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.restUrl + '/' + id);
  }

  public deleteTeam(id: number) {
    return this.http.delete(this.restUrl + '/' + id);
  }

}
