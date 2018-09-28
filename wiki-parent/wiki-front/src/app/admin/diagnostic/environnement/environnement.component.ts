import { DataTableUtils } from '../../../utils/dataTableUtils';
import { Environment } from '../../../models/environment';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from '../../../services/environment.service';
import { Layer } from '../../../models/layer';


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
      for ( let i = 0 ; i < this.environments.length ; i++) {
        this.environmentService.getLayersByEnviron(this.environments[i].id).subscribe(
          (layers: Layer[]) => {
            this.environments[i].layers = layers;
          }
        );
      }
   },
    (response: HttpErrorResponse) => {
      this.error = response.error;
    }
    ,
    () => {
      console.log( this.environments);
      this.gererateDataTable();
    }
  );
}

}
