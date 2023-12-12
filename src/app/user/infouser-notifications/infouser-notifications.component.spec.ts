import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfouserNotificationsComponent } from './infouser-notifications.component';

describe('InfouserNotificationsComponent', () => {
  let component: InfouserNotificationsComponent;
  let fixture: ComponentFixture<InfouserNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfouserNotificationsComponent]
    });
    fixture = TestBed.createComponent(InfouserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
