import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import User from '../../business/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  profileForm: FormGroup;
  //login: FormControl;
  //password: FormControl;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  public user: User = null;

  ngOnInit() {
    this.createFormControls();
  }

  auth() {
    this.user = this.authService.auth('417165', 'password');
  }

  logOut() {
    this.authService.logOut();
    this.user = null;
  }

  createFormControls() {
    const login = new FormControl('', [Validators.required, Validators.minLength( 6 ), Validators.maxLength(6)] );
    const password = new FormControl('', Validators.required);
    this.profileForm = this.fb.group({
      login: login ,
      password: password
    });
  }

  get login() {
      return this.profileForm.get('login');
  }

  get password() {
    return this.profileForm.get('password');
  }
}
