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
  constructor(private roleService: RoleService ) {

  }

  protected gererateDataTable(): void {
    jquery(document).ready(
      function() {
        const table: any = jquery('.table');
        table.DataTable({
                          'searching': false,
                          'language': {
                                        'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
                            }
                      });
  }
);
}

  ngOnInit() {
    this.loadRoles();
    //jquery('table.table').DataTable();
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
