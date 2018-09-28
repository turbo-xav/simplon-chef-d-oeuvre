import { EnvironmentService } from '../../../../services/environment.service';
import { Environment } from '../../../../models/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-environnement-edit',
  templateUrl: './environnement-edit.component.html',
  styleUrls: ['./environnement-edit.component.scss']
})
export class EnvironnementEditComponent implements OnInit {

  environment: Environment;
  error: Error;
  envirForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private environmentService: EnvironmentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.environmentService.getEnvironment(Number(id)).subscribe(
            (environ: Environment) => {
              if (environ != null) {
            this.environment = environ;
          } else {
            this.router.navigateByUrl('admin/diagnostic/environnement');
          }
        }
      );
    } else {
      this.environment = new Environment(null, '');
    }
    this.createFormControls();

  }

  createFormControls() {
    const name = new FormControl('', [Validators.required]);

    this.envirForm = this.formBuilder.group({
      name: name
    });
  }

  get name() {
    return this.envirForm.get('name');
  }

  save() {
    this.error = null;
    if (this.envirForm.valid) {
      this.environmentService.saveEnv(this.environment).subscribe(
        () => {
          this.router.navigateByUrl('/admin/diagnostic/environnement');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }
}
