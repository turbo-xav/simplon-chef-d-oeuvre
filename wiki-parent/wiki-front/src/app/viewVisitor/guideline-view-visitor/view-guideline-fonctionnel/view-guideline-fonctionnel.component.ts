import { Component, OnInit } from '@angular/core';
import { GuidelineView } from '../../../models/guideline-view';

@Component({
  selector: 'app-view-guideline-fonctionnel',
  templateUrl: './view-guideline-fonctionnel.component.html',
  styleUrls: ['./view-guideline-fonctionnel.component.scss']
})
export class ViewGuidelineFonctionnelComponent implements OnInit {

  constructor() { }

  listGuidelines: GuidelineView[] = [
    {
      id: 1,
      name: 'GuideA',
      file: 'string',
      type: 'Functionnal guideline',
      description: 'description'
    },
    {
        id: 2,
        name: 'GuideB',
        file: 'string',
        type: 'Technical guideline',
        description: 'description'
    },
    {
        id: 3,
        name: 'GuideC',
        file: 'string',
        type: 'Functionnal guideline',
        description: 'description'
    },
  ];

  ngOnInit() {
  }

}
