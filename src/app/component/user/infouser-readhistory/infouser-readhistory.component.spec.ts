import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfouserReadhistoryComponent } from './infouser-readhistory.component';

describe('InfouserReadhistoryComponent', () => {
  let component: InfouserReadhistoryComponent;
  let fixture: ComponentFixture<InfouserReadhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfouserReadhistoryComponent]
    });
    fixture = TestBed.createComponent(InfouserReadhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
