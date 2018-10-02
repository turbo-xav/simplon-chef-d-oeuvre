import { Component, OnInit } from '@angular/core';
import { Guideline } from '../../../models/guideline';
import { GuidelineService } from '../../../services/guideline.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-guideline-technique',
  templateUrl: './view-guideline-technique.component.html',
  styleUrls: ['./view-guideline-technique.component.scss']
})
export class ViewGuidelineTechniqueComponent implements OnInit {

  guidelines: Guideline[];

  error: Error = new Error('');

  constructor(private guidelineService: GuidelineService) { }

  ngOnInit() {
    this.loadGuidelines();
  }

  loadGuidelines() {
    this.guidelineService.getGuidelines().subscribe(
      (guidelines: Guideline[]) => {
        this.guidelines = guidelines;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }
  getDownloadUrl(guideline: Guideline) {
    return this.guidelineService.getDownloadUrl(guideline);
  }
}


