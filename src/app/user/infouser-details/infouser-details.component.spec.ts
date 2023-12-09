import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfouserDetailsComponent } from './infouser-details.component';

describe('InfouserDetailsComponent', () => {
  let component: InfouserDetailsComponent;
  let fixture: ComponentFixture<InfouserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfouserDetailsComponent]
    });
    fixture = TestBed.createComponent(InfouserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
