import { UserService } from './../../services/user.service';
import { GuidelineService } from './../../services/guideline.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Guideline } from './../../models/guideline';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { Error } from './../../models/technical/error';


@Component({
  selector: 'app-guideline-edit',
  templateUrl: './guideline-edit.component.html',
  styleUrls: ['./guideline-edit.component.scss']
})
export class GuidelineEditComponent implements OnInit {

  guideline: Guideline;
  user: User;
  error: Error = new Error('');
  guidelineForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private guidelineService: GuidelineService,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.guidelineService.getGuideline(Number(id)).subscribe(
        (guideline: Guideline) => {
          if (guideline != null) {
            this.guideline = guideline;
          } else {
            this.router.navigateByUrl('/guideline');
          }
        }
      );
    } else {
      this.guideline = new Guideline(null, '', '', '', '');
    }
    this.createFormControls();
  }
  createFormControls() {
    const name = new FormControl('', [Validators.required]);
    const file = new FormControl('', [Validators.required]);
    const type = new FormControl('', [Validators.required]);
   const description = new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(10)]);


    this.guidelineForm = this.fb.group({
      name: name,
      file: file,
      type: type ,
      description: description
    });
  }
  get name() {
    return this.guidelineForm.get('name');
  }

  get file() {
    return this.guidelineForm.get('file');
  }

  get type() {
    return this.guidelineForm.get('type');
  }

  get description() {
    return this.guidelineForm.get('decription');
  }

  save() {
   console.log(this.guidelineForm);
    if (this.guidelineForm.valid) {
      this.guidelineService.saveGuideline(this.guideline).subscribe(
        () => {
          this.router.navigateByUrl('/guideline');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          console.log(this.error.errors);
        }
      );
    }
  }
}
