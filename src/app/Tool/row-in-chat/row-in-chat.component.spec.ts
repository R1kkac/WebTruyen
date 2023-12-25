import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowInChatComponent } from './row-in-chat.component';

describe('RowInChatComponent', () => {
  let component: RowInChatComponent;
  let fixture: ComponentFixture<RowInChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RowInChatComponent]
    });
    fixture = TestBed.createComponent(RowInChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
