import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
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

  //public user: User = null;

  // public userSubject:  Subject<User>;

  public get user() {
    const user = this.authService.getUser();
    //console.log(user);
    return user;
  }


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {

  const subject: Subject<User> = authService.getAuthUserSubject();
   subject.subscribe(
     (user: User) => {
      this.error = null;
      if (user == null) {
          this.error = 'you have been disconnected, please try to reconnect !';
          setTimeout(() => { this.error = null; }, 2500 );
        }
      }
    );
  }

  ngOnInit() {
    this.createFormControls();
  }

  public auth() {
    if ( !this.authService.auth(
      this.profileForm.get('login').value     ,
      this.profileForm.get('password').value  )
    ) {
      this.error = 'you can\'t connect ';
      return;
    }
    this.router.navigateByUrl('/');
  }

  public isAuth() {
    return this.authService.isAuth();
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/');
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
