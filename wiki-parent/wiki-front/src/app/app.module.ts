import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { ArchitectureTeamComponent } from './architecture-team/architecture-team.component';
import { RefServiceComponent } from './ref-service/ref-service.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleEditComponent } from './admin/role/role-edit/role-edit.component';
import { UserComponent } from './admin/user/user.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { RoleService } from './services/role.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AccountCreateComponent } from './authentication/account-create/account-create.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent            },
  { path: 'admin/role', component: RoleComponent        },
  { path: 'admin/role/edit/:id', component: RoleEditComponent },
  { path: 'admin/role/edit', component: RoleEditComponent },
  { path: 'admin/user', component: UserComponent        },
  { path: 'admin/user/edit/:id', component: UserEditComponent },
  { path: 'admin/user/edit', component: UserEditComponent },
  { path: 'authentication/account/create', component: AccountCreateComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuidelineComponent,
    ArchitectureTeamComponent,
    RefServiceComponent,
    FooterComponent,
    AuthenticationComponent,
    AdminComponent,
    RoleComponent,
    RoleEditComponent,
    UserComponent,
    UserEditComponent,
    AccountCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes, { enableTracing: true }),
  ],
providers: [
  AuthService,
  RoleService,
  UserService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
