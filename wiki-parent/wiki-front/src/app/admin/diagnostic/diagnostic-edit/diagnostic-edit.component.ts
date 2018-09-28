import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { ServerService } from '../../../services/server.service';
import { DiagnosticService } from '../../../services/diagnostic.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Application } from '../../../models/application';
import { Server } from '../../../models/server';
import { Diagnostic } from '../../../models/diagnostic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-edit',
  templateUrl: './diagnostic-edit.component.html',
  styleUrls: ['./diagnostic-edit.component.scss']
})
export class DiagnosticEditComponent implements OnInit {


  diagnostic: Diagnostic;
  servers: Server[];
  applications: Application[];

  error: Error = new Error('');

  diagForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private diagnosticService: DiagnosticService,
    private serverService: ServerService,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      console.log('toto');
      this.diagnosticService.getDiagnostic(Number(id)).subscribe(
        (diagnostic: Diagnostic) => {
          if (diagnostic != null) {
            this.diagnostic = diagnostic;
            console.log(diagnostic);
          } else {
            this.router.navigateByUrl('/admin/diagnostic');
          }
        }
      );
    } else {
      this.diagnostic = new Diagnostic(null, '');
    }

    this.createFormControls();
    this.loadServers();
    this.loadApplications();
  }

  loadServers() {
    this.serverService.getServers().subscribe(
      (servers: Server[]) => {
        this.servers = servers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(
      (applications: Application[]) => {
        this.applications = applications;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }


  createFormControls() {
  const url = new FormControl('', [Validators.required]);
  const diagnosticServer = new FormControl('');
  const diagnosticApplication = new FormControl('');

  this.diagForm = this.formBuilder.group({
    url: url,
    diagnosticServer : diagnosticServer,
    diagnosticApplication: diagnosticApplication,
  });
  }

  get url() {
    return this.diagForm.get('url');
  }

  get diagnosticServer() {
    return this.diagForm.get('diagnosticServer');
  }

  get diagnosticApplication() {
    return this.diagForm.get('diagnosticApplication');
  }

  changeServer(serverId) {
this.diagnostic.server = new Server(serverId, null);
// alert(this.diagnostic.server.id);
  }

  changeApplication(applicationId) {
    this.diagnostic.application = new Application(applicationId, null, null, null);
      }



  save() {
    if (this.diagForm.valid) {
                  this.diagnosticService.saveDiagnostic(this.diagnostic).subscribe(
        () => {
          this.router.navigateByUrl('/admin/diagnostic');

        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }
}
