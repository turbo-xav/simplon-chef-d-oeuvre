import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableUtils } from '../../utils/dataTableUtils';

/*
 * UserService Class definition
 *
 * @author <xavier.tagliarino@gmail.com>
 *
 */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  /**
   * @access private
   * @var {User[]} users : list of users to display in view
   */

  users: User[] = [];

  /**
   * @access private
   * @var {string} error : error message to display in view
   */

  error: string;

  /**
   * Initialize our component instance
   *
   * @param  {UserService} private userService : Injected instance of UserService
   * @param  {DataTableUtils} private dataTableUtils : Injected instance of dataTableUtils
   */
  constructor(private userService: UserService, private dataTableUtils: DataTableUtils) {

  }

  /**
   * Triggered after Angular is done creating the component.
   *
   * @param  {UserService} privateuserService
   * @param  {DataTableUtils} privatedataTableUtils
   */

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Load users list of our component by calling its injected UserService
   */

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

  /**
    * Delete a user from users list of our component by its id
    *
    * @param  {number} id : id of User
    */

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.dataTableUtils.remove(id);
        this.loadUsers();
      }
    );
  }

  /**
    * Generate the dataTable for sorting datas
    */

  private gererateDataTable(): void {
    this.dataTableUtils.generate();
  }
}
