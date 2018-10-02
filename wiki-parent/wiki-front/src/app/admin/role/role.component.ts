import { DataTableUtils } from '../../utils/dataTableUtils';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as jquery from 'jquery';
import 'datatables.net';
import { Router } from '@angular/router';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {


  roles: Role[] = [];
  error: Error;
  // Our future instance of DataTable
  dataTable: any;

  constructor(private router: Router, private roleService: RoleService, private dataTableUtils: DataTableUtils ) {

  }

  protected gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

  ngOnInit() {
    this.loadRoles();
  }

  delete(id: number) {
      this.roleService.deleteRole(id).subscribe(
          () => {
            this.dataTableUtils.remove(id);
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
