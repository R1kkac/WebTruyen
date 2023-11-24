import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangadetailComponent } from './mangadetail.component';

describe('MangadetailComponent', () => {
  let component: MangadetailComponent;
  let fixture: ComponentFixture<MangadetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangadetailComponent]
    });
    fixture = TestBed.createComponent(MangadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
