import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';

/*
 * UserService Class definition
 *
 * @author <xavier.tagliarino@gmail.com>
 *
 */

@Injectable()
export class UserService {

 /**
   * @access private
   * @var {string} restUrl : url of user backEnd
   */
  private restUrl: string = AppConfig.settings.apiBack.restUrl + '/user';

  /**
   * @param  {HttpClient} privatehttp : injected instance of HttpClient
   */
  constructor(private http:  HttpClient) { }

  /**
    * Get a list of Users from the Back-End
    *
    * @returns Observable
    *
    */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.restUrl);
  }


  /**
   *Create an account for a new User
   * @param  {User} user
   * @returns Observable
   */
  public createAccount(user: User): Observable<User> {
    return  this.http.post<User>(this.restUrl + '/account', user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
  }

   /**
    * Get a specific User by its id
    *
    * @param  {number} id : id of User    *
    * @returns Observable
    *
    */

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.restUrl + '/' + id);
  }


  /**
   * Save a user : update if its id is not null or create with an existing id
   *
   * @param  {User} user : User to save
   * @returns Observable
   */
  public saveUser(user: User): Observable<User> {
    if ( user.id != null ) {
      return  this.http.put<User>(this.restUrl, user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    } else {
      return  this.http.post<User>(this.restUrl, user, { headers : new HttpHeaders( AppConfig.settings.apiBack.jsonHeaders ) });
    }
  }

   /**
   * Delete a user with an existing id
   *
   * @param  {number} id : id of User
   * @returns Observable
   */

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.restUrl + '/' + id);
  }


}
