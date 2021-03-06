import { DiagnosticService } from './services/diagnostic.service';
import { LayerService } from './services/layer.service';
import { ApplicationService } from './services/application.service';
import { EnvironmentService } from './services/environment.service';
import { FonctionService } from './services/fonction.service';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './generic/header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FooterComponent } from './generic/footer/footer.component';
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

import { BodyComponent } from './generic/body/body.component';
import { DiagnosticComponent } from './admin/diagnostic/diagnostic.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MenuService } from './services/menu.service';
import { NotAllowedComponent } from './authentication/error/not-allowed/not-allowed.component';
import { DisconnectedComponent } from './authentication/error/disconnected/disconnected.component';
import { GuidelineService } from './services/guideline.service';


const interceptors = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
}];

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
import { DiagnosticEditComponent } from './admin/diagnostic/diagnostic-edit/diagnostic-edit.component';
import { OrganisationnalChartService } from './services/organisationnal-chart.service';
import { AccountUpdateComponent } from './authentication/account-update/account-update.component';

import { EnvironnementComponent } from './admin/diagnostic/environnement/environnement.component';
import { EnvironnementEditComponent } from './admin/diagnostic/environnement/environnement-edit/environnement-edit.component';
import { ApplicationComponent } from './admin/diagnostic/application/application.component';
import { ApplicationEditComponent } from './admin/diagnostic/application/application-edit/application-edit.component';
import { LayerComponent } from './admin/diagnostic/layer/layer.component';
import { LayerEditComponent } from './admin/diagnostic/layer/layer-edit/layer-edit.component';
import { ServerEditComponent } from './admin/diagnostic/server/server-edit/server-edit.component';
import { ServerService } from './services/server.service';
import { ServerComponent } from './admin/diagnostic/server/server.component';

import { NavBarComponent } from './generic/nav-bar/nav-bar.component';
import { ModalBasicComponent } from './generic/modal-basic/modal-basic.component';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ModalFunctionComponent } from './generic/modal-basic/modal-function/modal-function.component';
import { ModalMemberComponent } from './generic/modal-basic/modal-member/modal-member.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { DiagnosticViewVisitorComponent } from './viewVisitor/diagnostic-view-visitor/diagnostic-view-visitor.component';
import { DiagViewVisitorService } from './services/diag-view-visitor.service';
import { GuidelineViewVisitorComponent } from './viewVisitor/guideline-view-visitor/guideline-view-visitor.component';


import { FilterDiagConsult } from './models/technical/searchPipe/filter-diag-consult';
import { FilterPipe } from './models/technical/searchPipe/filterPipe';
import { FilterServer } from './models/technical/searchPipe/filter-server';
import { FilterAppli } from './models/technical/searchPipe/filter-appli';
import { FilterEnv } from './models/technical/searchPipe/filter-env';
import { FilterLayer } from './models/technical/searchPipe/filter-layer';
// tslint:disable-next-line:max-line-length
import { ViewGuidelineFonctionnelComponent } from './viewVisitor/guideline-view-visitor/view-guideline-fonctionnel/view-guideline-fonctionnel.component';
// tslint:disable-next-line:max-line-length
import { ViewGuidelineTechniqueComponent } from './viewVisitor/guideline-view-visitor/view-guideline-technique/view-guideline-technique.component';
import { OrganizationchartComponent } from './viewVisitor/organizationchart/organizationchart.component';
import { ViewGuidelineComponent } from './viewVisitor/view-guideline/view-guideline.component';
import { GuidelineViewService } from './services/guideline-view.service';
import { AccountPasswordComponent } from './authentication/account-password/account-password.component';

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
    DiagnosticEditComponent,
    AccountUpdateComponent,
    EnvironnementComponent,
    EnvironnementEditComponent,
    ApplicationComponent,
    ApplicationEditComponent,
    LayerComponent,
    LayerEditComponent,

    AccountUpdateComponent,
    NavBarComponent,
    ServerComponent,
    ServerEditComponent,

    NavBarComponent,
    ModalBasicComponent,
    ModalFunctionComponent,
    ModalMemberComponent,
    GuidelineViewVisitorComponent,
    NotFoundComponent,
    FilterPipe,
    FilterDiagConsult,
    FilterServer,
    FilterAppli,
    FilterEnv,
    FilterLayer,
    ViewGuidelineFonctionnelComponent,
    ViewGuidelineTechniqueComponent,
    ViewGuidelineComponent,
    AccountPasswordComponent

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
    EditorModule,
    NgxSmartModalModule,
        routing
  ],
providers: [
  ErrorService ,
  DataTableUtils,
  AuthService ,
  RoleService ,
  UserService ,
  AuthGuard  ,
  interceptors,
  MenuService,
  GuidelineService,
  GuidelineViewService,
  TeamService,
  OrganisationnalChartService,
  FonctionService,
  MemberService,
  EnvironmentService,
  ApplicationService,
  NgxSmartModalService,
  LayerService,
  ServerService,
  DiagnosticService,
  DiagViewVisitorService,
  AppConfig,
      { provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfig], multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
