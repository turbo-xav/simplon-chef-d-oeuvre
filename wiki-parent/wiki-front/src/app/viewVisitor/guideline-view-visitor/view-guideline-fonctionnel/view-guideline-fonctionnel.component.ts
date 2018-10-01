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
    {
      id: 4,
      name: 'Guide D',
      file: 'string',
      type: 'Functionnal guideline',
      description: 'description'
  },
  {
    id: 5,
    name: 'Guide E',
    file: 'string',
    type: 'Functionnal guideline',
    description: 'description'
},
{
  id: 6,
  name: 'Guide F',
  file: 'string',
  type: 'Functionnal guideline',
  description: 'description'
},
{
  id: 7,
  name: 'Guide G',
  file: 'string',
  type: 'Technical guideline',
  description: 'description'
},
{
  id: 8,
  name: 'Guide H',
  file: 'string',
  type: 'Functionnal guideline',
  description: 'description'
},
{
  id: 9,
  name: 'Guide I',
  file: 'string',
  type: 'Functionnal guideline',
  description: 'description'
},
{
  id: 10,
  name: 'Guide J',
  file: 'string',
  type: 'Functionnal guideline',
  description: 'description'
},
  ];

  ngOnInit() {
  }

}
