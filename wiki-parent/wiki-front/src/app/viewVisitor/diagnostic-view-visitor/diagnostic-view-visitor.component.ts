import { ServerService } from '../../services/server.service';
import { EnvironmentService } from '../../services/environment.service';
import { Component, OnInit } from '@angular/core';


import { DiagViewVisitorService } from '../../services/diag-view-visitor.service';
import { Diagnostic } from '../../models/diagnostic';
import { Environment } from '../../models/environment';
import { Layer } from '../../models/layer';
import { Application } from '../../models/application';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from '../../services/application.service';

import { LayerService } from '../../services/layer.service';
import { Server } from '../../models/server';
import { DataTableUtils } from '../../utils/dataTableUtils';
import { DiagnosticService } from '../../services/diagnostic.service';


@Component({
  selector: 'app-diagnostic-view-visitor',
  templateUrl: './diagnostic-view-visitor.component.html',
  styleUrls: ['./diagnostic-view-visitor.component.scss']
})
export class DiagnosticViewVisitorComponent implements OnInit {

  selectedApplication = 0;
  selectedEnviron = 0;
  selectedLayer = 0;
  selectedServer = 0;
  diagnostics: Diagnostic[] = [];
  envirs: Environment[];
  layers: Layer[];
  applications: Application[];
  servers: Server[];

  error: Error = new Error('');

  constructor(
    private diagViewVisitorService: DiagViewVisitorService,
    private applicationService: ApplicationService,
    private environmentService: EnvironmentService,
    private layerService: LayerService,
    private serverService: ServerService,
    private diagnosticService: DiagnosticService,

  ) { }



  ngOnInit() {

    this.loadDiagnostics();
    this.loadApplications();
    this.loadEnvirons();
    this.loadLayers();
    this.loadServers();
  }

  onEnvironmentSelect(envirId: number) {
    this.environmentService.getLayersByEnviron(envirId).subscribe(
      (layers: Layer[]) => {
        this.layers = layers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
  onLayerSelect(layerId: number) {
    this.layerService.getServersByLayer(layerId).subscribe(
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

  loadEnvirons() {
    this.environmentService.getEnvironments().subscribe(
      (envirs: Environment[]) => {
        this.envirs = envirs;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }


  loadLayers() {
    this.layerService.getLayers().subscribe(
      (layers: Layer[]) => {
        this.layers = layers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
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


  loadDiagnostics() {
    this.diagnosticService.getDiagnostics().subscribe(
      (diagnostics: Diagnostic[]) => {
        this.diagnostics = diagnostics;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
}








