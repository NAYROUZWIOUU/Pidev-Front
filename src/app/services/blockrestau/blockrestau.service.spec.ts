import { TestBed } from '@angular/core/testing';

import { BlockrestauService } from './blockrestau.service';

describe('BlockrestauService', () => {
  let service: BlockrestauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockrestauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
