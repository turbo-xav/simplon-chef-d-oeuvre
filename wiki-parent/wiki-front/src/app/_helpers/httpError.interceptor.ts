import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService, private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // Clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set('headerName', 'headerValue') });
        // const authReq = req.clone();
        const authReq = req.clone({
            withCredentials: true,
          });
        //console.log(authReq);
        // send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {

                //console.log(error.status);
                if (error instanceof HttpErrorResponse) {
                    if ( !navigator.onLine) {
                        this.errorService.addErrors(['navigator is off line']);
                    } else if (error.status === 401) {
                        this.errorService.addErrors(['you are not connected']);
                        this.authService.logOut();
                        this.router.navigateByUrl('/authentication/error/disconnected');
                    }  else if (error.status === 403) {
                        this.errorService.addErrors(['you are not allowed to acess to this feature']);
                        this.router.navigateByUrl('/authentication/error/not-allowed');
                    } else if (( error.status === 400 ) ) {

                    } else if (( error.status === 0 ) ) {
                        this.errorService.addErrors([`Unable to connect to API service`]);
                        this.authService.logOut();
                        this.router.navigateByUrl('/');
                    } else {
                        this.errorService.addErrors([`An error has occured please try again`]);
                        this.authService.logOut();
                        this.router.navigateByUrl('/');
                    }
                }
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
