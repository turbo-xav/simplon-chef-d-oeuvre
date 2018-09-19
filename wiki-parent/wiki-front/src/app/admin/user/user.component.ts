import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { DataTableUtils } from '../../utils/dataTableUtils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  error: string;

  constructor(private userService: UserService, private dataTableUtils: DataTableUtils ) {

  }

  ngOnInit() {
    this.loadUsers();
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
      }
    );
}

private gererateDataTable(): void {
  if ( typeof this.dataTableUtils.getTable() ===  'undefined') {
    this.dataTableUtils.generate();
  }
}

loadUsers() {
  this.userService.getUsers().subscribe(
    (users: User[]) => {
      this.users = users;
      this.gererateDataTable();
    },
    (response: HttpErrorResponse) => {
      this.error = response.error;
    }
  );
}

}
