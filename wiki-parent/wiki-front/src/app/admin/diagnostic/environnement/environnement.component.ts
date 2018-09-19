import { DataTableUtils } from './../../../utils/dataTableUtils';
import { Environment } from './../../../models/environment';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { EnvironmentService } from '../../../services/environment.service';


@Component({
  selector: 'app-environnement',
  templateUrl: './environnement.component.html',
  styleUrls: ['./environnement.component.scss']
})
export class EnvironnementComponent implements OnInit {


  environments: Environment[] = [];
  error: Error;

  constructor(private environmentService: EnvironmentService, private dataTableUtils: DataTableUtils ) { }


  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

  ngOnInit() {
    this.loadEnvironments();
  }

  delete(id: number) {
    this.environmentService.deleteEnvironment(id).subscribe(
        () => {
          this.loadEnvironments();
      }
    );
}

loadEnvironments() {

  this.environmentService.getEnvironments().subscribe(
    (environments: Environment[]) => {
      this.environments = environments;
      this.gererateDataTable();
    },
    (response: HttpErrorResponse) => {
      this.error = response.error;
    }
  );
}

}
