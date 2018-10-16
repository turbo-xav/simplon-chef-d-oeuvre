import { RoleService } from '../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../../models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../../models/technical/error';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  roles: Role[];

  error: Error = new Error('');


  userForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private roleService: RoleService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) {
      this.userService.getUser(Number(id)).subscribe(
        (user: User) => {
          if ( user != null ) {
            this.user = user;
            this.user.password = '';
          } else {
            this.router.navigateByUrl('/admin/user');
          }
        }
      );
    } else {
      this.user = new User( null, '', '', '', '', '', false, true);
    }

    this.createFormControls();
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  createFormControls() {
    const firstName = new FormControl('', [Validators.required]);
    const lastName = new FormControl('', [Validators.required]);
    const mail = new FormControl('', [Validators.required, Validators.email]);
    const uid = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);
    //const password = new FormControl('', [Validators.required]);
    const userRole = new FormControl('', []);

    this.userForm = this.fb.group({
      firstName :  firstName  ,
      lastName  :  lastName   ,
      mail      :  mail       ,
      uid       :  uid        ,
      //password  :  password   ,
      userRole  :  userRole
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

  /*get password() {
    return this.userForm.get('password');
  }*/

  get userRole() {
    return this.userForm.get('userRole');
  }

  changeRole(roleId) {
    this.user.role = new Role(roleId, null);
  }

  save() {
    if ( this.userForm.valid ) {
      this.userService.saveUser(this.user).subscribe(
        () => {
          this.router.navigateByUrl('/admin/user');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          console.log(this.error.errors);
        }
      );
   }
  }

}
