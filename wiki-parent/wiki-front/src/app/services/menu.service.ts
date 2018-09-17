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
      'id': 0,
      'name': 'Homepage',
      'description': 'Page under construction !',
      'position': 'header',
      'path': '',
    },
    {
      'id': 1,
      'name': 'Team Organizationnal chart',
      'description': 'Ca va bientôt fonctionner !!!',
      'position': 'header',
      'path': '/organisationnal-chart',
    },
    {
      'id': 2,
      'name': 'Guidelines',
      'description': 'Ca va bientôt fonctionner !! !',
      'position': 'header',
      'path': '/guideline',
    },
    {
      'id': 3,
      'name': 'Diagnostic',
      'description': 'Page under construction ! !',
      'position': 'header',
      'path': '/diagnostic',
    },


  ];

  getList(position): ItemMenu [] {
    return this.menu.filter(item => item.position === position);
  }
  }


