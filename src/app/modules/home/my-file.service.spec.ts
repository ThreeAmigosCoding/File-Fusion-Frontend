import { TestBed } from '@angular/core/testing';

import { MyFileService } from './my-file.service';

describe('MyFileService', () => {
  let service: MyFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
