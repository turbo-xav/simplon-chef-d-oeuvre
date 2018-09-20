import { ServerService } from './../../../services/server.service';
import { Error } from './../../../models/technical/error';
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

  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

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

  loadServers() {
    this.serverService.getServers().subscribe(
      (servers: Server[]) => {
        this.servers = servers;
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
}
