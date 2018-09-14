import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../models/team';
import { Member } from '../models/member';

@Injectable()
export class OrganisationnalChartService {

  private restUrl = AppConfig.settings.apiBack.restUrl + '/organisationnal-chart';

  constructor(private http:  HttpClient) {
  }
 
  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.restUrl);
  }

  public getTopTeam(): Observable<Team> {
    return this.http.get<Team>(this.restUrl + '/topTeam');
  }

  public getSubTeamsFromTopTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(this.restUrl + '/topTeam/subTeams');
  }

  public getMembersFromTeam(team: Team ): Observable<Member[]> {
    return this.http.get<Member[]>(this.restUrl + '/topTeam/subTeams/members/' + team.id);
  }

  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.restUrl + '/' + id);
  }
}
