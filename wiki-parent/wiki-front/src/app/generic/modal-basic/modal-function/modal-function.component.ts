import { Component, AfterViewInit, Input } from '@angular/core';
import { ModalBasicComponent } from '../modal-basic.component';
import * as jquery from 'jquery';
import { Fonction } from '../../../models/fonction';
@Component({
  selector: 'app-modal-function',
  templateUrl: './modal-function.component.html',
  styleUrls: ['./modal-function.component.scss']
})
export class ModalFunctionComponent extends ModalBasicComponent implements AfterViewInit {

  @Input() fonction: Fonction = null;

  ngAfterViewInit() {
    this.ngxSmartModalService.setModalData(this.fonction, this.idModal);
  }

}
