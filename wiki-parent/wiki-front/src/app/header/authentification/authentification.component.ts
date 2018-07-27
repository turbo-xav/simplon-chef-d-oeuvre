import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import User from '../../business/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  profileForm: FormGroup;
  login: FormControl;
  password: FormControl;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  public user: User = null;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  auth() {
    this.user = this.authService.auth('417165', 'password');
  }

  logOut() {
    this.authService.logOut();
    this.user = null;
  }

  createFormControls() {
    this.login = new FormControl('', [Validators.required, Validators.minLength( 10 )] ),
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.profileForm = this.fb.group({
      login: this.login ,
      password: this.password
    });
  }

}
