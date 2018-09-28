import { TestBed, inject } from '@angular/core/testing';

import { DiagViewVisitorService } from './diag-view-visitor.service';

describe('DiagViewVisitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiagViewVisitorService]
    });
  });

  it('should be created', inject([DiagViewVisitorService], (service: DiagViewVisitorService) => {
    expect(service).toBeTruthy();
  }));
});
