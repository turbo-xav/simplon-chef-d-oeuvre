import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  role: Role;

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
      this.role = new Role('');
    }

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

  save() {
    if ( this.roleForm.valid ) {
      this.roleService.saveRole(this.role).subscribe(
        () => {
          this.router.navigateByUrl('/admin/role');
        },
        () => {
          console.log('error');
        }
      );
    }
  }

}