import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSimilariComponent } from './film-similari.component';

describe('FilmSimilariComponent', () => {
  let component: FilmSimilariComponent;
  let fixture: ComponentFixture<FilmSimilariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmSimilariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmSimilariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
