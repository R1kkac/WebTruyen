import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulttoppmangaComponent } from './resulttoppmanga.component';

describe('ResulttoppmangaComponent', () => {
  let component: ResulttoppmangaComponent;
  let fixture: ComponentFixture<ResulttoppmangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResulttoppmangaComponent]
    });
    fixture = TestBed.createComponent(ResulttoppmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
