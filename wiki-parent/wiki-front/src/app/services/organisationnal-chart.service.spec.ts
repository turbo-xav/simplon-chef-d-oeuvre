import { TestBed, inject } from '@angular/core/testing';

import { OrganisationnalChartService } from './organisationnal-chart.service';

describe('OrganisationnalChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganisationnalChartService]
    });
  });

  it('should be created', inject([OrganisationnalChartService], (service: OrganisationnalChartService) => {
    expect(service).toBeTruthy();
  }));
});
