import { Subject } from 'rxjs/Subject';
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

  public userSubject:  Subject<User>;

  public get user() {
    const user = this.authService.getAuthInfos();
    return user;
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {

  const subject: Subject<User> = authService.getAuthUserSubject();
   subject.subscribe(
     (user: User) => {
        this.error = null;
        if (user === null) {
          this.error = 'you have been disconnected, please try to reconnect !';
          setTimeout(() => {
            this.error = null;
          }, 2500 );
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
      //this.user = this.authService.getAuthInfos();

      /*Observable.interval(1000).subscribe(x => {
        if ( !this.authService.isAuth()) {
          this.error = 'you are disconnected, please try to connect';
        }
      });*/
    }
  }

  public isAuth() {
    return this.authService.isAuth();
  }

  public logOut() {
    this.authService.logOut();
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
