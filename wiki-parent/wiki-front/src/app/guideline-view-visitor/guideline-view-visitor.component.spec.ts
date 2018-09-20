import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineViewVisitorComponent } from './guideline-view-visitor.component';

describe('GuidelineViewVisitorComponent', () => {
  let component: GuidelineViewVisitorComponent;
  let fixture: ComponentFixture<GuidelineViewVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineViewVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineViewVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
