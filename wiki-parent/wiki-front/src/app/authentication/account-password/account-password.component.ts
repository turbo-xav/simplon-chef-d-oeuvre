import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})
export class AccountPasswordComponent implements OnInit {

  user: User;

  error: Error;

  userForm: FormGroup;

  noAccount = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.createFormControls();
  }

  get password() {
    return this.userForm.get('password');
  }

  createFormControls() {
    const password = new FormControl('', [Validators.required, Validators.minLength(4)]);

    this.userForm = this.fb.group({
      password: password
    });
  }

  save() {
    this.error = null;
    if ( this.userForm.valid ) {
      this.userService.updatePassword(this.user.uid, this.userForm.get('password').value).subscribe(
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
