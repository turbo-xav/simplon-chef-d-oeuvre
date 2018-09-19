import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ItemMenu } from '../models/technical/itemMenu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


 constructor(public menuService: MenuService,  private router: Router) { }

 public get mainMenuList() {
    return this.menuService.getList('header');
 }

 public get selectedMenu(): ItemMenu  {
    return this.menuService.selectedMenu;
  }

  ngOnInit() {
  }


  selectMenu (itemMenu: ItemMenu) {
     this.menuService.selectedMenu = itemMenu;
  }

}
