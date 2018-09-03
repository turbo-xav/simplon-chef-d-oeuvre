import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import * as jquery from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

  selectMenu (name) {
    this.menuService.selectedMenu = name;
    // tslint:disable-next-line:no-unused-expression
    jquery('.navbar-toggler:visible').click();
  }
}
