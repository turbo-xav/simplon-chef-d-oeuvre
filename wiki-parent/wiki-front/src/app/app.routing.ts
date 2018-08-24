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

const appRoutes: Routes = [
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
    { path: 'authentication/get-password', component: GetPasswordComponent }

  ];

export const routing = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);
