import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthentificationComponent } from './header/authentification/authentification.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { ArchitectureTeamComponent } from './architecture-team/architecture-team.component';
import { RefServiceComponent } from './ref-service/ref-service.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleEditComponent } from './admin/role/role-edit/role-edit.component';
import { UserComponent } from './admin/user/user.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { RoleAddComponent } from './admin/role/role-add/role-add.component';
import { RoleService } from './services/role.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent            },
  { path: 'admin/role', component: RoleComponent        },
  { path: 'admin/role/edit/:id', component: RoleEditComponent },
  { path: 'admin/role/add', component: RoleAddComponent },
  { path: 'admin/user', component: UserComponent        }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuidelineComponent,
    ArchitectureTeamComponent,
    RefServiceComponent,
    FooterComponent,
    AuthentificationComponent,
    AdminComponent,
    RoleComponent,
    RoleEditComponent,
    UserComponent,
    UserEditComponent,
    RoleAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes, { enableTracing: true })
  ],
providers: [AuthService, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
