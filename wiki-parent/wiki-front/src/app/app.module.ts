import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './service/auth.service';
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

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/role', component: RoleComponent },
  { path: 'admin/user', component: UserComponent }
 
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
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot( appRoutes, { enableTracing: true })
  ],
providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
