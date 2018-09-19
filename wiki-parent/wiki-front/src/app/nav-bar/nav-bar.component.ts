import { Component, OnInit, Input } from '@angular/core';
import { ItemMenu } from '../models/technical/itemMenu';
import * as jquery from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() menuList: ItemMenu[];
  @Input() navId: string;

  constructor() { }

  ngOnInit() {

    const navId = this.navId;

    const component = this;


    jquery(document).ready(
      function() {
        jquery(`nav#${navId} .nav-link`).bind('click', function() {
          component.toggleMenu(navId);
        });
    });

  }

  toggleMenu(navId) {
    if ( jquery(`nav#${navId} .navbar-toggler:visible`).length > 0 ) {
      jquery(`nav#${navId} .navbar-toggler:visible`).trigger('click');
    }
  }

}
