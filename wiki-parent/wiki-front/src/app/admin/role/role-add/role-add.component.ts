import { RoleService } from './../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  role: Role;

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService, private router: Router ) { }

  ngOnInit() {
    this.createFormControls();
  }

  createFormControls() {
    const name = new FormControl('', [Validators.required]);

    this.roleForm = this.fb.group({
      name: name
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  add() {
    if ( this.roleForm.valid ) {
      this.roleService.addRole(this.role).subscribe(
        () => {
          this.router.navigateByUrl('/admin/role');
        },
        () => {
          this.router.navigateByUrl('/admin/role');
        }
      );
    }
  }

}
