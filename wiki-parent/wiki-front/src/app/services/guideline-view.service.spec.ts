import { TestBed, inject } from '@angular/core/testing';

import { GuidelineViewService } from './guideline-view.service';

describe('GuidelineViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuidelineViewService]
    });
  });

  it('should be created', inject([GuidelineViewService], (service: GuidelineViewService) => {
    expect(service).toBeTruthy();
  }));
});
