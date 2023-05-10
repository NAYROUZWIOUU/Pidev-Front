import { TestBed } from '@angular/core/testing';

import { FidelityCardService } from './fidelity-card-service.service';

describe('FidelityCardServiceService', () => {
  let service: FidelityCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FidelityCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
