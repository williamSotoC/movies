import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopPupComponent } from './pop-pup.component';

describe('PopPupComponent', () => {
  let component: PopPupComponent;
  let fixture: ComponentFixture<PopPupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopPupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopPupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
