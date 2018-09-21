import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


 constructor( private authService: AuthService ) { }

 public get isAuth() {
   return this.authService.isAuth();
 }

  ngOnInit() {
  }

}
