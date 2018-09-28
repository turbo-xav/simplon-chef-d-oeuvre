import { HttpErrorResponse } from '@angular/common/http';
import { Diagnostic } from '../../models/diagnostic';
import { Component, OnInit } from '@angular/core';
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
    private diagnosticService: DiagnosticService,
    private dataTableUtils: DataTableUtils
  ) {}

  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

  ngOnInit() {
    // console.log('cocuoud');
    this.loadDiagnostics();
  }
  delete(id: number) {
    this.diagnosticService.deleteDiagnostic(id).subscribe(
      () => {
        this.loadDiagnostics();
      }
    );
  }


  loadDiagnostics() {
      this.diagnosticService.getDiagnostics().subscribe(
        (diagnostics: Diagnostic[]) => {
          this.diagnostics = diagnostics;
          this.gererateDataTable();
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }


}
