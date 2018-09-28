import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticViewVisitorComponent } from './diagnostic-view-visitor.component';

describe('DiagnosticViewVisitorComponent', () => {
  let component: DiagnosticViewVisitorComponent;
  let fixture: ComponentFixture<DiagnosticViewVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticViewVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticViewVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
