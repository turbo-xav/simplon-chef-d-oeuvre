import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureTeamComponent } from './architecture-team.component';

describe('ArchitectureTeamComponent', () => {
  let component: ArchitectureTeamComponent;
  let fixture: ComponentFixture<ArchitectureTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectureTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectureTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
