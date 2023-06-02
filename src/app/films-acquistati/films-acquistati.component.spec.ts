import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsAcquistatiComponent } from './films-acquistati.component';

describe('FilmsAcquistatiComponent', () => {
  let component: FilmsAcquistatiComponent;
  let fixture: ComponentFixture<FilmsAcquistatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmsAcquistatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsAcquistatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
