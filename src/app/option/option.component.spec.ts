import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPage } from './option.page';

describe('OptionPage', () => {
  let component: OptionPage;
  let fixture: ComponentFixture<OptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
