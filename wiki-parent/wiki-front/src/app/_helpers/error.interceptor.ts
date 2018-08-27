import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService, private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.logOut();

        return next.handle(request).do( () => { }, (response) =>  {

            if (response instanceof HttpErrorResponse) {

                //this.authService.logOut();

                if ( !navigator.onLine) {
                    this.errorService.addErrors([`navigator is off line`]);
                } else if (response.status === 401) {
                    this.errorService.addErrors([`you are not allowed to access`]);
                    this.authService.logOut();
                } else if (( response.status === 400 )  && response.error) {
                    this.errorService.addErrors(Array.isArray(response.error) ? response.error : [response.error]);
                } else if (( response.status === 0 ) ) {
                    this.errorService.addErrors([`Unable to connect to API service`]);
                } else {
                    this.errorService.addErrors([`An error has occured please try again`]);
                }
            }

            return Observable.throw(response);
        });
    }
}
