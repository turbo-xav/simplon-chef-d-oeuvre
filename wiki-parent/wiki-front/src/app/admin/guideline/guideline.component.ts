import { Component, OnInit } from '@angular/core';
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

  constructor(private guidelineService: GuidelineService, private dataTableUtils: DataTableUtils) { }

  ngOnInit() {
    this.loadGuidelines();
  }

  private gererateDataTable(): void {
      this.dataTableUtils.generate();
  }

  loadGuidelines() {
    this.guidelineService.getGuidelines().subscribe(
      (guidelines: Guideline[]) => {
        this.guidelines = guidelines;
        this.gererateDataTable();
      }
    );
  }

  deleteGuideline(id: number) {
    this.guidelineService.deleteGuideline(id).subscribe(
      () => {
      this.loadGuidelines();
      }
    );
  }

  getDownloadUrl(guideline: Guideline) {
    return this.guidelineService.getDownloadUrl(guideline);
  }

}
