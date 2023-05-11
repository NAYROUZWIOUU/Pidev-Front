import { TestBed } from '@angular/core/testing';

import { FmembershipService } from './fmembership.service';

describe('FmembershipService', () => {
  let service: FmembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
