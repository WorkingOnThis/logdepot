import { TestBed, inject } from '@angular/core/testing';

import { DepositoService } from './deposito.service';

describe('DepositoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepositoService]
    });
  });

  it('should be created', inject([DepositoService], (service: DepositoService) => {
    expect(service).toBeTruthy();
  }));
});
