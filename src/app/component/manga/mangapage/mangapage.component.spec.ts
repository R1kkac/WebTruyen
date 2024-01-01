import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangapageComponent } from './mangapage.component';

describe('MangapageComponent', () => {
  let component: MangapageComponent;
  let fixture: ComponentFixture<MangapageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangapageComponent]
    });
    fixture = TestBed.createComponent(MangapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
