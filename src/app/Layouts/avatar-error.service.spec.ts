import { TestBed } from '@angular/core/testing';

import { AvatarErrorService } from './avatar-error.service';

describe('AvatarErrorService', () => {
  let service: AvatarErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
