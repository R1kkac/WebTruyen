import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopmangaComponent } from './topmanga.component';

describe('TopmangaComponent', () => {
  let component: TopmangaComponent;
  let fixture: ComponentFixture<TopmangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopmangaComponent]
    });
    fixture = TestBed.createComponent(TopmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
