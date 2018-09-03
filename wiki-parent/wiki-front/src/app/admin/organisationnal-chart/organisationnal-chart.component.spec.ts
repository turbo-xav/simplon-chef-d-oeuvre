import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationnalChartComponent } from './organisationnal-chart.component';

describe('OrganisationnalChartComponent', () => {
  let component: OrganisationnalChartComponent;
  let fixture: ComponentFixture<OrganisationnalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationnalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationnalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
