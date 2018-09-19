import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironnementEditComponent } from './environnement-edit.component';

describe('EnvironnementEditComponent', () => {
  let component: EnvironnementEditComponent;
  let fixture: ComponentFixture<EnvironnementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironnementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironnementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
