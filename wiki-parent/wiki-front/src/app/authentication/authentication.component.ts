import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  profileForm: FormGroup;

  error: string = null;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  public user: User = null;

  ngOnInit() {
    this.createFormControls();
  }

  public auth() {
    if ( this.authService.auth('417165', 'password') ) {
      this.user = this.authService.getAuthInfos();
      Observable.interval(1000).subscribe(x => {
        if( !this.authService.isAuth()) {
          this.error = 'you are disconnected, please try to connect';
        }
      });
    }
  }

  public isAuth() {
    return this.authService.isAuth();
  }

  public logOut() {
    this.authService.logOut();
    this.user = null;
  }

  private createFormControls() {
    const login = new FormControl('', [Validators.required, Validators.minLength( 6 ), Validators.maxLength(6)] );
    const password = new FormControl('', Validators.required);
    this.profileForm = this.fb.group({
      login: login ,
      password: password
    });
  }

  public get login() {
      return this.profileForm.get('login');
  }

  public get password() {
    return this.profileForm.get('password');
  }
}
