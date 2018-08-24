import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  role: Role;
  error: Error;
  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) {
      this.roleService.getRole(Number(id)).subscribe(
        (role: Role) => {
          if ( role != null ) {
            this.role = role;
          } else {
            this.router.navigateByUrl('/admin/role');
          }
        }
      );
    } else {
      this.role = new Role(null, '');
    }

    this.createFormControls();
  }

  createFormControls() {
    const name = new FormControl('', []);

    this.roleForm = this.fb.group({
      name: name
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  save() {
    this.error = null;
    if ( this.roleForm.valid ) {
      this.roleService.saveRole(this.role).subscribe(
        () => {
          this.router.navigateByUrl('/admin/role');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }

}
