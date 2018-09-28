import { Diagnostic } from '../../../models/diagnostic';
import { ServerService } from '../../../services/server.service';
import { Error } from '../../../models/technical/error';
import { Component, OnInit } from '@angular/core';

import { DataTableUtils } from '../../../utils/dataTableUtils';
import { HttpErrorResponse } from '@angular/common/http';
import { Server } from '../../../models/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  servers: Server[] = [];
  error: Error;

  constructor(
    private serverService: ServerService,
    private dataTableUtils: DataTableUtils
  ) { }


  ngOnInit() {
    this.loadServers();
  }

  delete(id: number) {
    this.serverService.deleteServer(id).subscribe(
      () => {
        this.loadServers();
      }
    );
  }

  private gererateDataTable(): void {
    if ( typeof this.dataTableUtils.getTable() ===  'undefined') {
      this.dataTableUtils.generate();
    }
  }


  loadServers() {
    this.serverService.getServers().subscribe(
      (servers: Server[]) => {
        this.servers = servers;
        this.gererateDataTable();
        // for (let i = 0; i < this.servers.length; i++) {
        //   this.serverService.getDiagnosticsByServer(this.servers[i].id).subscribe(
        //     (diagnostics: Diagnostic[]) => {
        //       this.servers[i].diagnostics = diagnostics;
        //     }
        //   );
        // }
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
      );
  }
}
