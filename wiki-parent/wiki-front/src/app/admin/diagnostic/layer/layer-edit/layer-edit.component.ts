import { environment } from './../../../../../environments/environment';
import { EnvironmentService } from './../../../../services/environment.service';
import { LayerService } from './../../../../services/layer.service';
import { Environment } from './../../../../models/environment';
import { Component, OnInit } from '@angular/core';
import { Layer } from '../../../../models/layer';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-layer-edit',
  templateUrl: './layer-edit.component.html',
  styleUrls: ['./layer-edit.component.scss']
})
export class LayerEditComponent implements OnInit {

  layer: Layer;
  environments: Environment[];

  error: Error = new Error('');

  layerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private layerService: LayerService,
    private environmentService: EnvironmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.layerService.getLayer(Number(id)).subscribe(
        (layer: Layer) => {
          if (layer != null) {
            this.layer = layer;
          } else {
            this.router.navigateByUrl('/admin/diagnostic/layer');
          }
        }
      );
    } else {
      this.layer = new Layer(null, '');
    }

    this.createFormControls();
    this.loadEnvironments();
  }

  loadEnvironments() {
    this.environmentService.getEnvironments().subscribe(
      (environments: Environment[]) => {
        this.environments = environments;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }


  createFormControls() {
    const name = new FormControl('', [Validators.required]);
   // const environment = new FormControl('');
   const layerEnvironment = new FormControl('');

    this.layerForm = this.formBuilder.group({
      name: name,
      //environment: environment,
     layerEnvironment : layerEnvironment,
    });
  }
  get name() {
    return this.layerForm.get('name');
  }

  get layerEnvironment() {
    return this.layerForm.get('layerEnvironment');
  }

  changeEnvironment(environmentId) {
    this.layer.environ = new Environment(environmentId, null);
  }

  save() {
    if (this.layerForm.valid) {
      // this.layer.name = this.layerForm.value['name'];
      // this.layer.environment = this.layerForm.value['environment'];

      this.layerService.saveLayer(this.layer).subscribe(
        () => {
          this.router.navigateByUrl('/admin/diagnostic/layer');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          // console.log(this.error.errors);
        }
      );
    }
  }

}
