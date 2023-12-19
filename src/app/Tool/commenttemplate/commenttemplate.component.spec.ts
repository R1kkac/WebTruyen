import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenttemplateComponent } from './commenttemplate.component';

describe('CommenttemplateComponent', () => {
  let component: CommenttemplateComponent;
  let fixture: ComponentFixture<CommenttemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommenttemplateComponent]
    });
    fixture = TestBed.createComponent(CommenttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
