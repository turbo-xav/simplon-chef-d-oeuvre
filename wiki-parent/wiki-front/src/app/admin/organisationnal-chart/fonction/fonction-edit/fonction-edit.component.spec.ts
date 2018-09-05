import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionEditComponent } from './fonction-edit.component';

describe('FonctionEditComponent', () => {
  let component: FonctionEditComponent;
  let fixture: ComponentFixture<FonctionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonctionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
