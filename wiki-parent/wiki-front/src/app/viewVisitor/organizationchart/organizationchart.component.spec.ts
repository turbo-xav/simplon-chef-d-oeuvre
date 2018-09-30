import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationchartComponent } from './organizationchart.component';

describe('OrganizationchartComponent', () => {
  let component: OrganizationchartComponent;
  let fixture: ComponentFixture<OrganizationchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
