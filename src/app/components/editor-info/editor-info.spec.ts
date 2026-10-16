import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorInfo } from './editor-info';

describe('EditorInfo', () => {
  let component: EditorInfo;
  let fixture: ComponentFixture<EditorInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
