import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmangaComponent } from './readmanga.component';

describe('ReadmangaComponent', () => {
  let component: ReadmangaComponent;
  let fixture: ComponentFixture<ReadmangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadmangaComponent]
    });
    fixture = TestBed.createComponent(ReadmangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
