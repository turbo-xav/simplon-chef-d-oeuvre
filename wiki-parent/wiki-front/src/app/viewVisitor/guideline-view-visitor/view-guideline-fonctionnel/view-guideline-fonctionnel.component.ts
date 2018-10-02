import { GuidelineService } from './../../../services/guideline.service';
import { Guideline } from './../../../models/guideline';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-guideline-fonctionnel',
  templateUrl: './view-guideline-fonctionnel.component.html',
  styleUrls: ['./view-guideline-fonctionnel.component.scss']
})
export class ViewGuidelineFonctionnelComponent implements OnInit {

  guidelines: Guideline [];

  error: Error = new Error('');

  constructor(
    private guidelineService: GuidelineService) { }

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
