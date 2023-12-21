import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainchatComponent } from './mainchat.component';

describe('MainchatComponent', () => {
  let component: MainchatComponent;
  let fixture: ComponentFixture<MainchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainchatComponent]
    });
    fixture = TestBed.createComponent(MainchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
