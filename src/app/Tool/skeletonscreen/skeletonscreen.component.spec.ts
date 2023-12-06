import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonscreenComponent } from './skeletonscreen.component';

describe('SkeletonscreenComponent', () => {
  let component: SkeletonscreenComponent;
  let fixture: ComponentFixture<SkeletonscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonscreenComponent]
    });
    fixture = TestBed.createComponent(SkeletonscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
