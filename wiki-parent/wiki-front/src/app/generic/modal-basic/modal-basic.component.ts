import { Component, AfterViewInit, Input  } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})

export class ModalBasicComponent implements AfterViewInit {

  @Input() idModal: string;

  private datasObject: Object = null;

  public get datas(): Object {
    return this.datasObject;
  }

  public set datas(datas: Object) {
     this.datasObject = datas;
  }

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.setModalData(this.datas, this.idModal);
  }
}
