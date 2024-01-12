import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplycommentdataComponent } from './replycommentdata.component';

describe('ReplycommentdataComponent', () => {
  let component: ReplycommentdataComponent;
  let fixture: ComponentFixture<ReplycommentdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplycommentdataComponent]
    });
    fixture = TestBed.createComponent(ReplycommentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
