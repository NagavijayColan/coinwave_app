import { TestBed, inject } from '@angular/core/testing';

import { CompDataSharingService } from './comp-data-sharing.service';

describe('CompDataSharingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompDataSharingService]
    });
  });

  it('should be created', inject([CompDataSharingService], (service: CompDataSharingService) => {
    expect(service).toBeTruthy();
  }));
});
