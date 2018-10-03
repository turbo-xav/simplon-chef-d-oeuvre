import { Diagnostic } from './../../models/diagnostic';
import { Environment } from './../../models/environment';
import { Component, OnInit } from '@angular/core';
import { Layer } from '../../models/layer';
import { Application } from '../../models/application';
import { HttpErrorResponse } from '@angular/common/http';
import { Server } from '../../models/server';
import { DiagViewVisitorService } from '../../services/diag-view-visitor.service';


@Component({
  selector: 'app-diagnostic-view-visitor',
  templateUrl: './diagnostic-view-visitor.component.html',
  styleUrls: ['./diagnostic-view-visitor.component.scss']
})
export class DiagnosticViewVisitorComponent implements OnInit {

  selectedApplication = '';
  selectedEnviron = '';
  selectedLayer = '';
  selectedServer = '';
  diagnostics: Diagnostic[] = [];
  envirs: Environment[];
  layers: Layer[];
  applications: Application[];
  servers: Server[];

  error: Error = new Error('');

  constructor(private diagViewVisitorService: DiagViewVisitorService) { }



  ngOnInit() {

    this.loadDiagnostics();
    this.loadApplications();
    this.loadEnvirons();
    this.loadLayers();
    this.loadServers();
  }

  onChangeApplication(applicationId: number) {
this.loadDiagnostics();
    if (String(applicationId) === '') {
      this.loadEnvirons();
    } else {
      this.diagViewVisitorService.getEnvironnements(applicationId).subscribe(
        (envirs: Environment[]) => {
          this.envirs = envirs;
        }
      );
    }
  }

  onEnvironmentSelect(envirId: number) {
this.loadDiagnostics();
if (String(envirId) === '') {
      this.loadLayers();
    } else {
      this.diagViewVisitorService.getLayersByEnviron(envirId).subscribe(
        (layers: Layer[]) => {
          this.layers = layers;
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }
  onLayerSelect(layerId: number) {
    this.loadDiagnostics();
    if (String(layerId) === '') {
      this.loadServers();
    } else {
      this.diagViewVisitorService.getServersByLayer(layerId).subscribe(
        (servers: Server[]) => {
          this.servers = servers;
        },
        (response: HttpErrorResponse) => {
          this.error = response
          .error;
        }
      );

    }
  }

  onServerSelect(serverId: number) {
    this.loadDiagnostics();
    if (String(serverId) === '') {
      this.loadServers();
    }
    }

  loadApplications() {
    this.diagViewVisitorService.getApplications().subscribe(
      (applications: Application[]) => {
        this.applications = applications;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  loadEnvirons() {
    this.diagViewVisitorService.getEnvironments().subscribe(
      (envirs: Environment[]) => {
        this.envirs = envirs;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }


  loadLayers() {
    this.diagViewVisitorService.getLayers().subscribe(
      (layers: Layer[]) => {
        this.layers = layers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
  loadServers() {
    this.diagViewVisitorService.getServers().subscribe(
      (servers: Server[]) => {
        this.servers = servers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }


  loadDiagnostics() {
    this.diagViewVisitorService.getDiagnosticsWithParameters(
          this.selectedApplication ,
          this.selectedEnviron,
          this.selectedLayer,
          this.selectedServer
          ).subscribe(
      (diags: Diagnostic[]) => {
        this.diagnostics = diags;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  resetSelectionAndReloadTable() {
    this.diagViewVisitorService.getDiagnosticsWithParameters(
    this.selectedApplication = '',
    this.selectedEnviron = '',
    this.selectedLayer = '',
    this.selectedServer = '').subscribe(
      (diagnostics: Diagnostic[]) => {
        this.diagnostics = diagnostics;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
}
