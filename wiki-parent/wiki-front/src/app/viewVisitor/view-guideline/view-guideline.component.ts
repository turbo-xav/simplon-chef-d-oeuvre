import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from '../../models/guideline';
import { GuidelineService } from '../../services/guideline.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-guideline',
  templateUrl: './view-guideline.component.html',
  styleUrls: ['./view-guideline.component.scss']
})
export class ViewGuidelineComponent implements OnInit {

  // variable d'entreer du composant envoyé par un autre composant
  @Input() type: string;

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
          console.log('guidelines', this.guidelines);
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
