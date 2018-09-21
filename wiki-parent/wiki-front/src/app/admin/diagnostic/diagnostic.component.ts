import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from './../../services/server.service';
import { ApplicationService } from './../../services/application.service';
import { Diagnostic } from './../../models/diagnostic';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { Server } from '../../models/server';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DataTableUtils } from '../../utils/dataTableUtils';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {


  diagnostics: Diagnostic[] = [];
  error: Error;



  constructor(
    private diagnostcService: DiagnosticService,
    private dataTableUtils: DataTableUtils
  ) {

   }

  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

  ngOnInit() {
    console.log('cocuoud');
  
    this.loadDiagnostics();
  }
  delete(id: number) {
    this.diagnostcService.deleteDiagnostic(id).subscribe(
      () => {
        this.loadDiagnostics();
      }
    );
  }

  // loadDiagnostics() {
  //   this.diagnostcService.getDiagnostics().subscribe(
  //     (diagnostics: Diagnostic[]) => {
  //       this.diagnostics = diagnostics;
  //       this.gererateDataTable();
  //     },
  //     (response: HttpErrorResponse) => {
  //       this.error = response.error;
  //     }
  //   );
  // }

  loadDiagnostics() {
    console.log('load');
    this.diagnostcService.getDiagnostics().subscribe(
      (diagnostics: Diagnostic[]) => {
        this.diagnostics = diagnostics;
        console.log(diagnostics);
      }
      ,
       (response: HttpErrorResponse) => {
          this.error = response.error;
        }
          ,
          () => {
            console.log(this.diagnostics);
            this.gererateDataTable();
          }
    );
  }

}
