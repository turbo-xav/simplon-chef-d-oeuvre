import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from '../../models/guideline';
import { GuidelineService } from '../../services/guideline.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GuidelineViewService } from '../../services/guideline-view.service';

@Component({
  selector: 'app-view-guideline',
  templateUrl: './view-guideline.component.html',
  styleUrls: ['./view-guideline.component.scss']
})
export class ViewGuidelineComponent implements OnInit {

  // variable d'entreer du composant envoyé par un autre composant
  @Input() type: string;

  typeTitle = '';

  guidelines: Guideline [];

  error: Error = new Error('');

  constructor(
    private guidelineViewService: GuidelineViewService) { }

    ngOnInit() {
      this.typeTitle = this.type === 'tech' ? 'technical' : 'functionnal';
      this.loadGuidelines();
    }

    loadGuidelines() {
      this.guidelineViewService.getGuidelines().subscribe(
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
      return this.guidelineViewService.getDownloadUrl(guideline);
    }

}
