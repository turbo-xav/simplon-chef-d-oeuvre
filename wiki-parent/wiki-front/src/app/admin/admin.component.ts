import { MenuService } from './../services/menu.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../models/technical/itemMenu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private menuService: MenuService) { }

  public get user() {
    return this.authService.getUser();
  }

  public get businessMenu(): ItemMenu[] {
    return this.menuService.getList('admin-business');
  }

  public get adminMenu(): ItemMenu[] {
    return this.menuService.getList('admin-users-and-roles');
  }


  ngOnInit() {

  }

}
