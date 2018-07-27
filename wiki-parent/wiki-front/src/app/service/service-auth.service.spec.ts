import { TestBed, inject } from '@angular/core/testing';

import { ServiceAuthService } from './service-auth.service';

describe('ServiceAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAuthService]
    });
  });

  it('should be created', inject([ServiceAuthService], (service: ServiceAuthService) => {
    expect(service).toBeTruthy();
  }));
});
