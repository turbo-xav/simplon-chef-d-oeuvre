import { Component, OnInit } from '../../../../node_modules/@angular/core';
import { Guideline } from '../../models/guideline';
import { GuidelineService } from '../../services/guideline.service';



@Component({
  selector: 'app-guideline',
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.scss']
})
export class GuidelineComponent implements OnInit {

  guidelines: Guideline[] = [];

  constructor(private guidelineservice: GuidelineService) { }

  ngOnInit() {
    this.loadGuidelines();
  }

  loadGuidelines() {
    this.guidelineservice.getGuidelines().subscribe(
      (guidelines: Guideline[]) => {
        this.guidelines = guidelines;
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

}
