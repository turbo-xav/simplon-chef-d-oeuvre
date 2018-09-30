import { Guideline } from '../../../models/guideline';
import { User } from '../../../models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { GuidelineService } from '../../../services/guideline.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../../models/technical/error';




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
  fileToUpLoad: File = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private guidelineService: GuidelineService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.guideline = new Guideline(null, '', '', '', '');
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
      type: type,
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
    return this.guidelineForm.get('description');
  }

  save() {
    if (this.guidelineForm.valid) {
      const user: User = this.authService.getUser();
      this.guideline.user = user;
           this.guidelineService.saveGuideline(this.guideline, this.fileToUpLoad).subscribe(
        () => {
          this.router.navigateByUrl('/admin/guideline');
          alert(this.guideline.user);
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          console.log(this.error.errors);
        }
      );
    }
  }

    public  onFileChanged(event) {
      this.fileToUpLoad = event.target.files[0];
  }
}
