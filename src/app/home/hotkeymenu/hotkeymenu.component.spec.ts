import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeymenuComponent } from './hotkeymenu.component';

describe('HotkeymenuComponent', () => {
  let component: HotkeymenuComponent;
  let fixture: ComponentFixture<HotkeymenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotkeymenuComponent]
    });
    fixture = TestBed.createComponent(HotkeymenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
