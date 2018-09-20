import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../models/application';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { ApplicationService } from '../../../../services/application.service';
import { HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss']
})
export class ApplicationEditComponent implements OnInit {

  application: Application;
  error: Error;
  appliForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.applicationService.getApplication(Number(id)).subscribe(
        (application: Application) => {
          if (application != null) {
            this.application = application;
          } else {
            this.router.navigateByUrl('admin/application');
          }
        }
      );
    } else {
      this.application = new Application(null, '', '', '');
    }
    this.createFormControls();
  }
  createFormControls() {
    const codeApp = new FormControl('', [Validators.required]);
    const title = new FormControl('', [Validators.required]);
    const description = new FormControl('');

    this.appliForm = this.formBuilder.group({
      codeApp: codeApp,
      title: title,
      description: description
    });
  }

    get codeApp() {
      return this.appliForm.get('codeApp');
    }

    get title() {
      return this.appliForm.get('title');
    }

    get description() {
      return this.appliForm.get('description');
    }

save() {
  this.error = null;
  if (this.appliForm.valid) {
    this.applicationService.saveAppli(this.application).subscribe(
      () => {
        this.router.navigateByUrl('/admin/diagnostic/application');
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
}

  }


