import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineEditComponent } from './guideline-edit.component';

describe('GuidelineEditComponent', () => {
  let component: GuidelineEditComponent;
  let fixture: ComponentFixture<GuidelineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
