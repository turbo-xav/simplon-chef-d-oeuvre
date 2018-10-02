import { Component } from '@angular/core';
import { OrganisationnalChartComponent } from './admin/organisationnal-chart/organisationnal-chart.component';
import { NotAllowedComponent } from './authentication/error/not-allowed/not-allowed.component';

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
import { DisconnectedComponent } from './authentication/error/disconnected/disconnected.component';
import { TeamComponent } from './admin/organisationnal-chart/team/team.component';
import { TeamEditComponent } from './admin/organisationnal-chart/team/team-edit/team-edit.component';
import { GuidelineComponent } from './admin/guideline/guideline.component';
import { GuidelineEditComponent } from './admin/guideline/guideline-edit/guideline-edit.component';
import { FonctionComponent } from './admin/organisationnal-chart/fonction/fonction.component';
import { FonctionEditComponent } from './admin/organisationnal-chart/fonction/fonction-edit/fonction-edit.component';
import { MemberComponent } from './admin/organisationnal-chart/member/member.component';
import { MemberEditComponent } from './admin/organisationnal-chart/member/member-edit/member-edit.component';
import { DiagnosticComponent } from './admin/diagnostic/diagnostic.component';
import { AccountUpdateComponent } from './authentication/account-update/account-update.component';
import { EnvironnementComponent } from './admin/diagnostic/environnement/environnement.component';
import { EnvironnementEditComponent } from './admin/diagnostic/environnement/environnement-edit/environnement-edit.component';
import { ApplicationComponent } from './admin/diagnostic/application/application.component';
import { ApplicationEditComponent } from './admin/diagnostic/application/application-edit/application-edit.component';
import { LayerComponent } from './admin/diagnostic/layer/layer.component';
import { LayerEditComponent } from './admin/diagnostic/layer/layer-edit/layer-edit.component';
import { ServerComponent } from './admin/diagnostic/server/server.component';
import { ServerEditComponent } from './admin/diagnostic/server/server-edit/server-edit.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { DiagnosticEditComponent } from './admin/diagnostic/diagnostic-edit/diagnostic-edit.component';
import { GuidelineViewVisitorComponent } from './viewVisitor/guideline-view-visitor/guideline-view-visitor.component';
import { DiagnosticViewVisitorComponent } from './viewVisitor/diagnostic-view-visitor/diagnostic-view-visitor.component';
import { OrganizationchartComponent } from './viewVisitor/organizationchart/organizationchart.component';
// tslint:disable-next-line:max-line-length
import { ViewGuidelineFonctionnelComponent } from './viewVisitor/guideline-view-visitor/view-guideline-fonctionnel/view-guideline-fonctionnel.component';
// tslint:disable-next-line:max-line-length
import { ViewGuidelineTechniqueComponent } from './viewVisitor/guideline-view-visitor/view-guideline-technique/view-guideline-technique.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'authentication/account/create', component: AccountCreateComponent, canActivate: [AuthGuard] },
  { path: 'authentication/account/update', component: AccountUpdateComponent, canActivate: [AuthGuard] },
  { path: 'authentication/get-password', component: GetPasswordComponent },
  { path: 'authentication/error/not-found', component: NotFoundComponent },
  { path: 'authentication/error/not-allowed', component: NotAllowedComponent },
  { path: 'authentication/error/disconnected', component: DisconnectedComponent },
  { path: 'authentication/error', component: ErrorComponent },

  { path: 'organisationnal-chart', component: OrganizationchartComponent },
  { path: 'guidelineView', component: GuidelineViewVisitorComponent },
  { path: 'guidelineFonctionnel', component: ViewGuidelineFonctionnelComponent},
  { path: 'guidelineTechnique', component: ViewGuidelineTechniqueComponent},
  { path: 'diagnosticView', component: DiagnosticViewVisitorComponent },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/role', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'admin/role/edit/:id', component: RoleEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/role/edit', component: RoleEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin/user/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/user/edit', component: UserEditComponent, canActivate: [AuthGuard] },

  { path: 'admin/organisationnal-chart', component: OrganisationnalChartComponent, canActivate: [AuthGuard] },

  { path: 'admin/organisationnal-chart/team', component: TeamComponent },
  { path: 'admin/organisationnal-chart/team/edit', component: TeamEditComponent },
  { path: 'admin/organisationnal-chart/team/edit/:id', component: TeamEditComponent },

  { path: 'admin/organisationnal-chart/function', component: FonctionComponent },
  { path: 'admin/organisationnal-chart/function/edit', component: FonctionEditComponent },
  { path: 'admin/organisationnal-chart/function/edit/:id', component: FonctionEditComponent },

  { path: 'admin/organisationnal-chart/member', component: MemberComponent },
  { path: 'admin/organisationnal-chart/member/edit', component: MemberEditComponent },
  { path: 'admin/organisationnal-chart/member/edit/:id', component: MemberEditComponent },


  { path: 'admin/guideline', component: GuidelineComponent },
  { path: 'admin/guideline/edit', component: GuidelineEditComponent },
  { path: 'admin/guideline/edit/:id', component: GuidelineEditComponent },

  { path: 'admin/diagnostic', component: DiagnosticComponent },
  { path: 'admin/diagnostic/edit', component: DiagnosticEditComponent },
  { path: 'admin/diagnostic/edit/:id', component: DiagnosticEditComponent },


  { path: 'admin/diagnostic/environnement', component: EnvironnementComponent },
  { path: 'admin/diagnostic/environnement/edit', component: EnvironnementEditComponent },
  { path: 'admin/diagnostic/environnement/edit/:id', component: EnvironnementEditComponent },

  { path: 'admin/diagnostic/application', component: ApplicationComponent },
  { path: 'admin/diagnostic/application/edit', component: ApplicationEditComponent },
  { path: 'admin/diagnostic/application/edit/:id', component: ApplicationEditComponent },

  { path: 'admin/diagnostic/layer', component: LayerComponent },
  { path: 'admin/diagnostic/layer/edit', component: LayerEditComponent },
  { path: 'admin/diagnostic/layer/edit/:id', component: LayerEditComponent },

  { path: 'admin/diagnostic/server', component: ServerComponent },
  { path: 'admin/diagnostic/server/edit', component: ServerEditComponent },
  { path: 'admin/diagnostic/server/edit/:id', component: ServerEditComponent },


];

export const routing = RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/);
