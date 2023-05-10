import { TestBed } from '@angular/core/testing';

import { BlockFoyerService } from './blockfoyer.service';

describe('BlockfoyerService', () => {
  let service: BlockFoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockFoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
