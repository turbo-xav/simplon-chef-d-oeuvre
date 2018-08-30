import { Menu } from './menu';
import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {

  constructor() {
    this.selectedMenu = this.menu[0];

  }
  public selectedMenu: Menu;

  menu: Menu[] = [
    {
      'id': 0,
      'name': 'Homepage',
      'description': 'Page under construction !',
      'position': 'header',
      'path': '/home',
    },
    {
      'id': 1,
      'name': 'Organization chart',
      'description': 'Ca va bientôt fonctionner !!!',
      'position': 'header',
      'path': '/organizationchart',
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

  getList(position): Menu [] {
    return this.menu.filter(item => item.position === position);
  }
  }


