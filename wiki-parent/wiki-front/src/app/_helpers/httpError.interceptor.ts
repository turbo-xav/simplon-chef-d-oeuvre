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

        // console.log('intercepted request ... ');

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set('headerName', 'headerValue') });

        // console.log('Sending request with new header now ...');

        // send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console
                // console.log('Error Occurred : diconnect user for safety');
                // console.log(error);

                if (error instanceof HttpErrorResponse) {

                    this.authService.logOut();
                    if ( !navigator.onLine) {
                        this.errorService.addErrors([`navigator is off line`]);
                    } else if (error.status === 401) {
                        this.errorService.addErrors([`you are not allowed to access`]);
                        this.authService.logOut();
                    } else if (( error.status === 400 )  && error.error) {
                        this.errorService.addErrors(Array.isArray(error.error) ? error.error : [error.error]);
                    } else if (( error.status === 0 ) ) {
                        this.errorService.addErrors([`Unable to connect to API service`]);
                    } else {
                        this.errorService.addErrors([`An error has occured please try again`]);
                    }
                }


                this.authService.logOut();
                this.router.navigateByUrl('/');
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
