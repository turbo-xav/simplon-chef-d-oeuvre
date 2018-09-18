import { FonctionService } from './services/fonction.service';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleEditComponent } from './admin/role/role-edit/role-edit.component';
import { UserComponent } from './admin/user/user.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { RoleService } from './services/role.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AccountCreateComponent } from './authentication/account-create/account-create.component';
import { GetPasswordComponent } from './authentication/get-password/get-password.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';
import { ErrorComponent } from './authentication/error/error.component';
import { ErrorService } from './services/error.service';
import { HttpErrorInterceptor } from './_helpers/httpError.interceptor';
import { OrganizationchartComponent } from './organizationchart/organizationchart.component';
import { BodyComponent } from './body/body.component';
import { DiagnosticComponent } from './admin/diagnostic/diagnostic.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MenuService } from './services/menu.service';
import { NotAllowedComponent } from './authentication/error/not-allowed/not-allowed.component';
import { DisconnectedComponent } from './authentication/error/disconnected/disconnected.component';
import { GuidelineService } from './services/guideline.service';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { HttpModule } from '@angular/http';
import { OrganisationnalChartComponent } from './admin/organisationnal-chart/organisationnal-chart.component';
import { TeamComponent } from './admin/organisationnal-chart/team/team.component';
import { TeamEditComponent } from './admin/organisationnal-chart/team/team-edit/team-edit.component';
import { TeamService } from './services/team.service';
import { GuidelineEditComponent } from './admin/guideline/guideline-edit/guideline-edit.component';
import { GuidelineComponent } from './admin/guideline/guideline.component';

import { MemberComponent } from './admin/organisationnal-chart/member/member.component';
import { MemberEditComponent } from './admin/organisationnal-chart/member/member-edit/member-edit.component';
import { FonctionComponent } from './admin/organisationnal-chart/fonction/fonction.component';
import { FonctionEditComponent } from './admin/organisationnal-chart/fonction/fonction-edit/fonction-edit.component';
import { MemberService } from './services/member.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTableUtils } from './utils/dataTableUtils';
import { DiagnosticViewVisitorComponent } from './diagnostic-view-visitor/diagnostic-view-visitor.component';
import { DiagnosticEditComponent } from './admin/diagnostic/diagnostic-edit/diagnostic-edit.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    GuidelineComponent,
    FooterComponent,
    AuthenticationComponent,
    AdminComponent,
    RoleComponent,
    RoleEditComponent,
    UserComponent,
    UserEditComponent,
    AccountCreateComponent,
    GetPasswordComponent,
    HomeComponent,
    ErrorComponent,
    OrganizationchartComponent,
    DiagnosticComponent,
    NotAllowedComponent,
    DisconnectedComponent,
    GuidelineEditComponent,
    OrganisationnalChartComponent,
    TeamComponent,
    TeamEditComponent,
    MemberComponent,
    MemberEditComponent,
    FonctionComponent,
    FonctionEditComponent,
    DiagnosticViewVisitorComponent,
    DiagnosticEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    EditorModule, // <- Important part
    routing
  ],
providers: [
  ErrorService ,
  DataTableUtils,
  AuthService ,
  RoleService ,
  UserService ,
  AuthGuard  ,
  MenuService,
  GuidelineService,
  TeamService,
  FonctionService,
  MemberService,
  AppConfig,
      { provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfig], multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
