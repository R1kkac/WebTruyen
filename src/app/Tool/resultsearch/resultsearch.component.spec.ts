import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsearchComponent } from './resultsearch.component';

describe('ResultsearchComponent', () => {
  let component: ResultsearchComponent;
  let fixture: ComponentFixture<ResultsearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsearchComponent]
    });
    fixture = TestBed.createComponent(ResultsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
