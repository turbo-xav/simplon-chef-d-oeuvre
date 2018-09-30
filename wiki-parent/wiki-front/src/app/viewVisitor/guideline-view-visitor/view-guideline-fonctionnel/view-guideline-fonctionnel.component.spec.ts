import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuidelineFonctionnelComponent } from './view-guideline-fonctionnel.component';

describe('ViewGuidelineFonctionnelComponent', () => {
  let component: ViewGuidelineFonctionnelComponent;
  let fixture: ComponentFixture<ViewGuidelineFonctionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuidelineFonctionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuidelineFonctionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
