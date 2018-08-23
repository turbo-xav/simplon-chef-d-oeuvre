import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if ( !this.authService.isAuth() ) {
           // not logged in so redirect to login page with the return url
             this.router.navigate(['/authentication/error'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        return true;
    }
}