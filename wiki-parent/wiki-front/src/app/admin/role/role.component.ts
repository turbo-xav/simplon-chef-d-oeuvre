import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  error: Error;
  constructor(private roleService: RoleService ) {

  }

  ngOnInit() {
    this.loadRoles();
  }

  delete(id: number) {
      this.roleService.deleteRole(id).subscribe(
          () => {
            this.loadRoles();
        }
      );
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
}
