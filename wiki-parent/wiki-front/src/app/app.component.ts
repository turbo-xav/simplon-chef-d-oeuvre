import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { tap } from 'rxjs/operators';
import { domRendererFactory3 } from '../../node_modules/@angular/core/src/render3/renderer';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map, catchError } from 'rxjs/operators';
import { Observer } from '../../node_modules/rxjs/Observer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  time = null;

  ngOnInit() {
  /* this.time = new Observable<string>((observer: Observer<string>) => {
      setInterval(  () => observer.next(new Date().toString()), 1000 );
    });*/
  }
}
