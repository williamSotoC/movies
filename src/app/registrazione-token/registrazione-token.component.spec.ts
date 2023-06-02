import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneTokenComponent } from './registrazione-token.component';

describe('RegistrazioneTokenComponent', () => {
  let component: RegistrazioneTokenComponent;
  let fixture: ComponentFixture<RegistrazioneTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrazioneTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrazioneTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
