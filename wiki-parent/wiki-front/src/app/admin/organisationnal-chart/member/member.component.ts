import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableUtils } from '../../../utils/dataTableUtils';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  members: Member[] = [];
  error: Error;
  constructor(private memberService: MemberService, private dataTableUtils: DataTableUtils ) {

  }

  ngOnInit() {
  
    this.loadMembers();
  }

  delete(id: number) {
      this.memberService.deleteMember(id).subscribe(
          () => {
            this.loadMembers();
        }
      );
  }

  private gererateDataTable(): void {
    if( typeof this.dataTableUtils.getTable() ===  'undefined') {
      this.dataTableUtils.generate();
    }
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(
      (members: Member[]) => {
        this.members = members;
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

}
