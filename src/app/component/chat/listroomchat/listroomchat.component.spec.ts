import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListroomchatComponent } from './listroomchat.component';

describe('ListroomchatComponent', () => {
  let component: ListroomchatComponent;
  let fixture: ComponentFixture<ListroomchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListroomchatComponent]
    });
    fixture = TestBed.createComponent(ListroomchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
