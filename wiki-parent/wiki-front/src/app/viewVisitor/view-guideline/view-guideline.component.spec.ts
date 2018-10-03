import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuidelineComponent } from './view-guideline.component';

describe('ViewGuidelineComponent', () => {
  let component: ViewGuidelineComponent;
  let fixture: ComponentFixture<ViewGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
