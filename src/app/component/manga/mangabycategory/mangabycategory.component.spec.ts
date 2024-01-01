import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangabycategoryComponent } from './mangabycategory.component';

describe('MangabycategoryComponent', () => {
  let component: MangabycategoryComponent;
  let fixture: ComponentFixture<MangabycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangabycategoryComponent]
    });
    fixture = TestBed.createComponent(MangabycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
