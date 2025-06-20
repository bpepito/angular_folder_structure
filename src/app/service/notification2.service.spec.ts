import { TestBed } from '@angular/core/testing';

import { Notification2Service } from './notification2.service';

describe('Notif2Service', () => {
  let service: Notification2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notification2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
