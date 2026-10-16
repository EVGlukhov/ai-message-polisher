import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorResult } from './editor-result';

describe('EditorResult', () => {
  let component: EditorResult;
  let fixture: ComponentFixture<EditorResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorResult],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
