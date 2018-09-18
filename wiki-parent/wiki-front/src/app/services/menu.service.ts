import { ItemMenu } from '../models/technical/itemMenu';
import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {

  constructor() {
    this.selectedMenu = this.menu[0];

  }
  public selectedMenu: ItemMenu;

  menu: ItemMenu[] = [
    {
      'id': 1,
      'name': 'Homepage',
      'description': 'Page under construction !',
      'position': 'header',
      'img': '',
      'icon': '',
      'path': '',
    },
    {
      'id': 2,
      'name': 'Team Organizationnal chart',
      'description': 'Ca va bientôt fonctionner !!!',
      'position': 'header',
      'img': '',
      'icon': '',
      'path': '/organisationnal-chart',
    },
    {
      'id': 3,
      'name': 'Guidelines',
      'description': 'Ca va bientôt fonctionner !! !',
      'position': 'header',
      'img': '',
      'icon': '',
      'path': '/guideline',
    },
    {
      'id': 4,
      'name': 'Diagnostic',
      'description': '',
      'position': 'header',
      'img': '',
      'icon': '',
      'path': '/diagnostic',
    }
    ,
    {
      'id': 5,
      'name': 'Manage Guidelines',
      'description': '',
      'position': 'admin-business',
      'img': '',
      'icon': '',
      'path': '/admin/guideline',
    }
    ,
    {
      'id': 6,
      'name': 'Manage Organisationnal Chart',
      'description': '',
      'position': 'admin-business',
      'img': '',
      'icon': '',
      'path': '/admin/organisationnal-chart',
    }
    ,
    {
      'id': 7,
      'name': 'Manage Diagnostic',
      'description': '',
      'position': 'admin-business',
      'img': '',
      'icon': '',
      'path': '/admin/diagnostic',
    }
    ,
    {
      'id': 8,
      'name': 'Manage Roles',
      'description': '',
      'position': 'admin-users-and-roles',
      'img': '',
      'icon': '',
      'path': '/admin/role',
    }
    ,
    {
      'id': 9,
      'name': 'Manage Users',
      'description': '',
      'position': 'admin-users-and-roles',
      'img': '',
      'icon': '',
      'path': '/admin/user',
    }



  ];

  getList(position): ItemMenu [] {
    return this.menu.filter(item => item.position === position);
  }
  }


