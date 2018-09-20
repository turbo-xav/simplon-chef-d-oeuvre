import { Component, Input, AfterViewInit } from '@angular/core';
import { Member } from '../../../models/member';
import { ModalBasicComponent } from '../modal-basic.component';

@Component({
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.scss']
})

export class ModalMemberComponent extends ModalBasicComponent implements AfterViewInit {

  @Input() member: Member = null;

  ngAfterViewInit() {
    this.ngxSmartModalService.setModalData(this.member, this.idModal);
  }

}
