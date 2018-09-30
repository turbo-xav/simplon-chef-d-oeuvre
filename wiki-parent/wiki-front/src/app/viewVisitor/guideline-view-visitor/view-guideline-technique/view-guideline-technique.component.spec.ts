import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuidelineTechniqueComponent } from './view-guideline-technique.component';

describe('ViewGuidelineTechniqueComponent', () => {
  let component: ViewGuidelineTechniqueComponent;
  let fixture: ComponentFixture<ViewGuidelineTechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuidelineTechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuidelineTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
