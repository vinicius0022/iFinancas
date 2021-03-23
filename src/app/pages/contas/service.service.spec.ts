import { TestBed } from '@angular/core/testing';

import { ContaService } from './service/conta-service';

describe('ServiceService', () => {
  let service: ContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
