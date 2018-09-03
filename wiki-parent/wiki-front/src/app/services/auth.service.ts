import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Subject } from 'rxjs/Subject';
import { AuthInfos } from '../models/auth/authInfos';
import { AppConfig } from '../app.config';



@Injectable()
export class AuthService {

  private restUrl = AppConfig.settings.apiBack.restUrl;

  authUserSubject = new Subject<User>();

  public getAuthUserSubject(): Subject<User> {
    return this.authUserSubject;
  }

  constructor(private http: HttpClient) {
  }

  public auth(uid: string, password: string): boolean {

    const authUser = new User(null, uid, 'Xavier', 'Tagliarino', 'xavier.tagliarino@gmail.com', password, true, true);
    authUser.setRole(new Role(1, 'Admin'));


    const params = 'username=' + uid + '&password=' + password;
    /*const param = new Array();
    param['username'] = uid;
    param['password'] = password;*/

    const headers = new HttpHeaders( { 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(this.restUrl + '/login', params, { headers })
      .subscribe(
        (response) => {
          this.authUserSubject.next(authUser);
          // Stockage dans le local storage
          const authInfos: AuthInfos = new AuthInfos();
          authInfos.user = authUser;
          const date: Date = new Date();
          authInfos.expire = date.getTime() + ( 30 * 60 * 1000 );
          sessionStorage.setItem('authInfos', JSON.stringify(authInfos));
    }
    ,
    (error) => {
      console.log('error ', error);
      this.logOut();
    }
  );
  return true;
  }

  login(): void {

  }

  isAuth(): boolean {
    if ( this.getAuthInfos() != null) {
      if ( this.getAuthInfos().user != null && this.getAuthInfos().expire != null) {
        const date: Date = new Date();
        const currentTime = date.getTime();
        if ( this.getAuthInfos().expire > date.getTime()) {
          return true;
        }
      }
    }
    this.logOut();
    return false;

  }

  getUser(): User {
    return this.getAuthInfos() !== null ? this.getAuthInfos().user : null;
  }

  getAuthInfos(): AuthInfos {
      const jsonAuthInfos = JSON.parse(sessionStorage.getItem('authInfos'));
      if ( jsonAuthInfos != null ) {
        const authInfos: AuthInfos = new AuthInfos();
        authInfos.user = new User(
                                    jsonAuthInfos.user.id         ,
                                    jsonAuthInfos.user.uid        ,
                                    jsonAuthInfos.user.firstName  ,
                                    jsonAuthInfos.user.lastName   ,
                                    jsonAuthInfos.user.mail       ,
                                    jsonAuthInfos.user.password   ,
                                    jsonAuthInfos.user.locked     ,
                                    jsonAuthInfos.user.enabled    ,
                                );
        authInfos.user.setRole(new Role(jsonAuthInfos.user.role.id, jsonAuthInfos.user.role.name));
        authInfos.expire = jsonAuthInfos.expire;
        return authInfos;
      }
      return null;
  }

  logOut(): void {
    if ( sessionStorage.getItem('authInfos') ) {
      this.http.post(this.restUrl + '/logout', null)
      .subscribe(
        (response) => {
        sessionStorage.clear();
        this.authUserSubject.next(this.getUser());
      }
    ,
    (error) => {
      console.log('error ', error);
      this.logOut();
    });
    }

  }

}
