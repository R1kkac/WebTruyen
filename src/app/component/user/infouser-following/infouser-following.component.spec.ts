import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfouserFollowingComponent } from './infouser-following.component';

describe('InfouserFollowingComponent', () => {
  let component: InfouserFollowingComponent;
  let fixture: ComponentFixture<InfouserFollowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfouserFollowingComponent]
    });
    fixture = TestBed.createComponent(InfouserFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
