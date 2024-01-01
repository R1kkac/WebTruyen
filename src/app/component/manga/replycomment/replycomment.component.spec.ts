import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplycommentComponent } from './replycomment.component';

describe('ReplycommentComponent', () => {
  let component: ReplycommentComponent;
  let fixture: ComponentFixture<ReplycommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplycommentComponent]
    });
    fixture = TestBed.createComponent(ReplycommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
