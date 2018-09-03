import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineDeleteComponent } from './guideline-delete.component';

describe('GuidelineDeleteComponent', () => {
  let component: GuidelineDeleteComponent;
  let fixture: ComponentFixture<GuidelineDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
