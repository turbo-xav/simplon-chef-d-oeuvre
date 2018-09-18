import { DataTableUtils } from '../../utils/dataTableUtils';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import * as jquery from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  error: Error;
  constructor(private roleService: RoleService, private dataTableUtils: DataTableUtils ) {

  }

  protected gererateDataTable(): void {
    if ( typeof this.dataTableUtils.getTable() ===  'undefined') {
      this.dataTableUtils.generate();
    }
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
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
}
