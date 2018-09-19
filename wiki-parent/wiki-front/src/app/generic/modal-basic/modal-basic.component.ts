import { Component, AfterViewInit, Input  } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})

export class ModalBasicComponent implements AfterViewInit {

  @Input() idModal: string;

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    const obj: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, this.idModal);
  }
}
