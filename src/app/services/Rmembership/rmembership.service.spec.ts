import { TestBed } from '@angular/core/testing';

import { RmembershipService } from './rmembership.service';

describe('RmembershipService', () => {
  let service: RmembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
