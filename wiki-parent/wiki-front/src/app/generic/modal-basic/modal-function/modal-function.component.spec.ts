import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFunctionComponent } from './modal-function.component';

describe('ModalFunctionComponent', () => {
  let component: ModalFunctionComponent;
  let fixture: ComponentFixture<ModalFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
