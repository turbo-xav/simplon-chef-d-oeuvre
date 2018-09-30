import { TestBed, inject } from '@angular/core/testing';

import { GuideLineViewService } from './guide-line-view.service';

describe('GuideLineViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuideLineViewService]
    });
  });

  it('should be created', inject([GuideLineViewService], (service: GuideLineViewService) => {
    expect(service).toBeTruthy();
  }));
});
