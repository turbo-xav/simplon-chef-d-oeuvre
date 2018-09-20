import { OrganisationnalChartService } from './../services/organisationnal-chart.service';
import { AdminComponent } from './../admin/admin.component';
import { AuthService } from '../services/auth.service';
import { Injectable, Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // User must be authenticated
        if ( !this.authService.isAuth() ) {
            this.authService.logOut();
            this.router.navigate(['authentication/error/disconnected'], { queryParams: { returnUrl: state.url }});
            return false;
        }

       const component: any =   route.component;
       let componentName = component.name.replace('Component', '');

       componentName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
       const acl = {
            admin : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            role : {
                authorizedRoles : ['ADMIN']
            },
            roleEdit : {
                authorizedRoles : ['ADMIN']
            },
            user : {
                authorizedRoles : ['ADMIN']
            },
            userEdit : {
                authorizedRoles : ['ADMIN']
            },
            guideline : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            guidelineEdit : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            team : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            teamEdit : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            member : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            },
            memberEdit : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            }
            ,
            organisationnalChart : {
                authorizedRoles : ['ADMIN' , 'TECHLEAD']
            }
        };

        // User must be in authorized group
        const role = this.authService.getUser().getRole().name;
        if ( typeof acl[componentName] !== 'undefined' ) {
            if ( acl[componentName].authorizedRoles.indexOf(role) === -1 ) {
                this.router.navigate(['authentication/error/not-allowed'], { queryParams: { returnUrl: state.url }});
                return false;
            }
        } else {
            console.log('authentifié uniquement pas de droit particulier', route.url);
        }
        return true;
    }
}
