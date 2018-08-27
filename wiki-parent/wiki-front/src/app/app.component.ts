import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnChanges, DoCheck } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { tap, takeUntil, delay } from 'rxjs/operators';
import { domRendererFactory3 } from '../../node_modules/@angular/core/src/render3/renderer';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map, catchError } from 'rxjs/operators';
import { Observer } from '../../node_modules/rxjs/Observer';
import { ErrorService } from './services/error.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private ngUnsubscribe: Subject<String[]>;

  public errors: string[];

  constructor(private errorService: ErrorService) {
      this.ngUnsubscribe = new Subject<String[]>();
      this.initializeErrors();
  }

  ngOnInit() {
    this.errors = [];
  }

  private initializeErrors() {
    this
          .errorService
          .getErrors()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((errors: string[]) => {
              this.errors = errors;
              setTimeout(() => { this.errors = []; }, 5000 );
          });
  }
}
