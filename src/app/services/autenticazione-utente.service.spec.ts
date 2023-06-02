import { TestBed } from '@angular/core/testing';

import { AutenticazioneUtenteService } from './autenticazione-utente.service';

describe('AutenticazioneUtenteService', () => {
  let service: AutenticazioneUtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticazioneUtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
