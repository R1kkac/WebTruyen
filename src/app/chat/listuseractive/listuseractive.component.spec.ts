import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuseractiveComponent } from './listuseractive.component';

describe('ListuseractiveComponent', () => {
  let component: ListuseractiveComponent;
  let fixture: ComponentFixture<ListuseractiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListuseractiveComponent]
    });
    fixture = TestBed.createComponent(ListuseractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
