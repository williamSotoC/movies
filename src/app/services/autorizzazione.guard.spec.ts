import { TestBed } from '@angular/core/testing';

import { AutorizzazioneGuard } from './autorizzazione.guard';

describe('AutorizzazioneGuard', () => {
  let guard: AutorizzazioneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutorizzazioneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
