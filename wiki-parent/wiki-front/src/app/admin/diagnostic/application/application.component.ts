import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './../../../services/application.service';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/application';
import { DataTableUtils } from '../../../utils/dataTableUtils';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  applications: Application[] = [];
  error: Error;

  constructor(private applicationService: ApplicationService,
    private dataTableUtils: DataTableUtils) { }

  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }


  ngOnInit() {
    this.loadApplications();
  }

  delete(id: number) {
    this.applicationService.deleteApplication(id).subscribe(
      () => {
        this.loadApplications();
      }
    );
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(
      (applications: Application[]) => {
        this.applications = applications;
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

}
