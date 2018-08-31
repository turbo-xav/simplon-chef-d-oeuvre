import { NotAllowedComponent } from './authentication/error/not-allowed/not-allowed.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { OrganizationchartComponent } from './organizationchart/organizationchart.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleEditComponent } from './admin/role/role-edit/role-edit.component';
import { UserComponent } from './admin/user/user.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { AccountCreateComponent } from './authentication/account-create/account-create.component';
import { GetPasswordComponent } from './authentication/get-password/get-password.component';
import { AuthGuard } from './_guards/auth.guard';
import { ErrorComponent } from './authentication/error/error.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { DisconnectedComponent } from './authentication/error/disconnected/disconnected.component';

const appRoutes: Routes = [
    { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'authentication/error', component: ErrorComponent     },
    { path: 'admin', component: AdminComponent           , canActivate: [AuthGuard]        },
    { path: 'admin/role', component: RoleComponent, canActivate: [AuthGuard]        },
    { path: 'admin/role/edit/:id', component: RoleEditComponent , canActivate: [AuthGuard]        },
    { path: 'admin/role/edit', component: RoleEditComponent, canActivate: [AuthGuard]        },
    { path: 'admin/user', component: UserComponent        , canActivate: [AuthGuard]        },
    { path: 'admin/user/edit/:id', component: UserEditComponent , canActivate: [AuthGuard]        },
    { path: 'admin/user/edit', component: UserEditComponent , canActivate: [AuthGuard]        },
    { path: 'authentication/account/create', component: AccountCreateComponent },
    { path: 'authentication/get-password', component: GetPasswordComponent },
    { path: 'authentication/error/not-allowed', component: NotAllowedComponent },
    { path: 'authentication/error/disconnected', component: DisconnectedComponent },
    { path: 'organizationchart', component: OrganizationchartComponent },
    { path: 'guideline', component: GuidelineComponent },
    { path: 'diagnostic', component: DiagnosticComponent },
    { path: 'home', component: HomeComponent }

  ];

export const routing = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);
