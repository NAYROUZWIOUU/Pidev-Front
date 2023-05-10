import { TestBed } from '@angular/core/testing';

import { WaitingListService } from './waitinglist.service';

describe('WaitinglistService', () => {
  let service: WaitingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
