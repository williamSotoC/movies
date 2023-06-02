import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercareFilmComponent } from './cercare-film.component';

describe('CercareFilmComponent', () => {
  let component: CercareFilmComponent;
  let fixture: ComponentFixture<CercareFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CercareFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CercareFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
