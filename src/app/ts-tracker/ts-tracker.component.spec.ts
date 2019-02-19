import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsTrackerPage } from './ts-tracker.page';

describe('TsTrackerPage', () => {
  let component: TsTrackerPage;
  let fixture: ComponentFixture<TsTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsTrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
