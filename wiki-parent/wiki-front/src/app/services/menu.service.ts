import { menuList } from '../models/datas/menus';
import { ItemMenu } from '../models/technical/itemMenu';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() {
    this.selectedMenu = this.menu[0];

  }
  public selectedMenu: ItemMenu;

  menu: ItemMenu[] = menuList;

  getList(position): ItemMenu [] {
    return this.menu.filter(item => item.position === position);
  }
}
