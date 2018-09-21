import { Component, OnInit } from '../../../../node_modules/@angular/core';
import { Guideline } from '../../models/guideline';
import { GuidelineService } from '../../services/guideline.service';
import { DataTableUtils } from '../../utils/dataTableUtils';



@Component({
  selector: 'app-guideline',
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.scss']
})
export class GuidelineComponent implements OnInit {

  guidelines: Guideline[] = [];

  constructor(private guidelineservice: GuidelineService, private dataTableUtils: DataTableUtils) { }

  ngOnInit() {
    this.loadGuidelines();
  }

  private gererateDataTable(): void {
    if ( typeof this.dataTableUtils.getTable() ===  'undefined') {
      this.dataTableUtils.generate();
    }
  }

  loadGuidelines() {
    this.guidelineservice.getGuidelines().subscribe(
      (guidelines: Guideline[]) => {
        this.guidelines = guidelines;
        this.gererateDataTable();
      }
    );
  }

  deleteGuideline(id: number) {
    this.guidelineservice.deleteGuideline(id).subscribe(
      () => {
      this.loadGuidelines();
      }
    );
  }

  download(guideline: Guideline) {
    console.log('download', guideline.file);
  }

}
