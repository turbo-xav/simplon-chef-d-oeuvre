
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  user: User;

  noAccount = true;

  error: Error;

  userForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {
    this.user = new User(null, '', '', '', '', '', false, true);
    this.user.role = null;
    this.createFormControls();
    this.noAccount = true;
  }

  createFormControls() {
    const firstName = new FormControl('', [Validators.required]);
    const lastName = new FormControl('', [Validators.required]);
    const mail = new FormControl('', [Validators.required, Validators.email]);
    const uid = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);

    this.userForm = this.fb.group({
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      uid: uid
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get mail() {
    return this.userForm.get('mail');
  }

  get uid() {
    return this.userForm.get('uid');
  }

  save() {
    this.error = null;
    if ( this.userForm.valid ) {
      this.userService.createAccount(this.user).subscribe(
        () => {
          this.noAccount = false;
          // this.router.navigateByUrl('/');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          console.log(this.error);
        }
      );
    }
  }

}
