import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  error: string;

  constructor(private userService: UserService ) {

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

loadUsers() {
  this.userService.getUsers().subscribe(
    (users: User[]) => {
      this.users = users;
    },
    (response: HttpErrorResponse) => {
      this.error = response.error;
    }
  );
}

}
