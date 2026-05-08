import { TestBed } from '@angular/core/testing';

import { PracticeGroupingService } from './practice-grouping.service';

describe('PracticeGroupingService', () => {
  let service: PracticeGroupingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeGroupingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
