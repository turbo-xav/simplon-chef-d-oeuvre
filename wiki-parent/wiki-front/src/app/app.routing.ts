import { OrganisationnalChartComponent } from './admin/organisationnal-chart/organisationnal-chart.component';
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
import { GuidelineEditComponent } from './guideline/guideline-edit/guideline-edit.component';
import { TeamComponent } from './admin/organisationnal-chart/team/team.component';
import { TeamEditComponent } from './admin/organisationnal-chart/team/team-edit/team-edit.component';
import { FonctionComponent } from './admin/organisationnal-chart/fonction/fonction.component';
import { FonctionEditComponent } from './admin/organisationnal-chart/fonction/fonction-edit/fonction-edit.component';


const appRoutes: Routes = [
    // { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'authentication/error', component: ErrorComponent     },
    { path: 'admin', component: AdminComponent           , canActivate: [AuthGuard]        },
    { path: 'admin/role', component: RoleComponent, canActivate: [AuthGuard]        },
    { path: 'admin/role/edit/:id', component: RoleEditComponent , canActivate: [AuthGuard]        },
    { path: 'admin/role/edit', component: RoleEditComponent, canActivate: [AuthGuard]        },
    { path: 'admin/user', component: UserComponent        , canActivate: [AuthGuard]        },
    { path: 'admin/user/edit/:id', component: UserEditComponent , canActivate: [AuthGuard]        },
    { path: 'admin/user/edit', component: UserEditComponent , canActivate: [AuthGuard]        },
    { path: 'admin/organisationnal-chart', component: OrganisationnalChartComponent , canActivate: [AuthGuard]        },
    { path: 'admin/organisationnal-chart/team', component: TeamComponent },
    { path: 'admin/organisationnal-chart/team/edit', component: TeamEditComponent },
    { path: 'admin/organisationnal-chart/team/edit/:id', component: TeamEditComponent },
    { path: 'admin/organisationnal-chart/function', component: FonctionComponent },
    { path: 'admin/organisationnal-chart/function/edit', component: FonctionEditComponent },
    { path: 'admin/organisationnal-chart/function/edit/:id', component: FonctionEditComponent },

    { path: 'authentication/account/create', component: AccountCreateComponent },
    { path: 'authentication/get-password', component: GetPasswordComponent },
    { path: 'authentication/error/not-allowed', component: NotAllowedComponent },
    { path: 'authentication/error/disconnected', component: DisconnectedComponent },

    { path: 'organizationnalchart', component: OrganizationchartComponent },
    { path: 'guideline', component: GuidelineComponent },
    { path: 'guideline/edit', component: GuidelineEditComponent },
    { path: 'guideline/edit/:id', component: GuidelineEditComponent },
    { path: 'diagnostic', component: DiagnosticComponent },
    { path: 'home', component: HomeComponent }

  ];

export const routing = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);
