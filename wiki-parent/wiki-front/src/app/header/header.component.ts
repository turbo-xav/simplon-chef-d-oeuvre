import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import * as jquery from 'jquery';
import { ItemMenu } from '../models/technical/itemMenu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


 constructor(public menuService: MenuService,  private router: Router) { }

  get selectedMenu(): ItemMenu  {
    return this.menuService.selectedMenu;
  }

  ngOnInit() {
    for ( let i = 0 ; i < this.menuService.menu.length ; i++) {
      if (location.pathname === this.menuService.menu[i].path) {
        this.menuService.selectedMenu = this.menuService.menu[i];
        break;
      }
    }
    this.detectMenu();
    jquery(window).bind('resize', this.detectMenu);
  }

  detectMenu() {
    if (jquery('.navbar-toggler:visible').length > 0) {
      jquery('.burgerMenu').fadeOut(250);
    } else {
      jquery('.burgerMenu').fadeIn(250);
    }
  }

  selectMenu (itemMenu: ItemMenu) {
     this.menuService.selectedMenu = itemMenu;
  }

  toggleMenu() {
   if (jquery('.navbar-toggler:visible').length > 0) {
      if ( jquery('.burgerMenu:visible').length) {
        jquery('.burgerMenu').fadeOut(500);
      } else {
        jquery('.burgerMenu').fadeIn(500);
      }
    }
  }
}
