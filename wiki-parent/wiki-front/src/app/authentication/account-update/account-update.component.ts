
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {

  user: User;

  noAccount = true;

  error: Error;

  userForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.createFormControls();
    this.noAccount = true;
  }

  createFormControls() {
    const firstName = new FormControl('', [Validators.required]);
    const lastName = new FormControl('', [Validators.required]);
    const mail = new FormControl('', [Validators.required, Validators.email]);
    const uid = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);
    const password = new FormControl('', [Validators.required, Validators.minLength(4)]);


    this.userForm = this.fb.group({
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      uid: uid,
      password: password
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

  get password() {
    return this.userForm.get('password');
  }

  save() {
    this.error = null;
    if ( this.userForm.valid ) {
      this.authService.saveUser(this.user).subscribe(
        () => {
          this.noAccount = false;
          this.authService.authUserSubject.next(this.user);
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
