import { TestBed } from '@angular/core/testing';

import { ContattiFormService } from './contatti-form.service';

describe('ContattiFormService', () => {
  let service: ContattiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContattiFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
