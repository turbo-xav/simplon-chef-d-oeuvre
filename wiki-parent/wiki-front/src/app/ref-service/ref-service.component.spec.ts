import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefServiceComponent } from './ref-service.component';

describe('RefServiceComponent', () => {
  let component: RefServiceComponent;
  let fixture: ComponentFixture<RefServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
