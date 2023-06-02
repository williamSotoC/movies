import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoYouTubeComponent } from './video-you-tube.component';

describe('VideoYouTubeComponent', () => {
  let component: VideoYouTubeComponent;
  let fixture: ComponentFixture<VideoYouTubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoYouTubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoYouTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
