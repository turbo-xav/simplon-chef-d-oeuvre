import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if ( !this.authService.isAuth() ) {
            this.router.navigate(['authentication/error/disconnected'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        console.log('ok connected');

        return true;
    }
}
