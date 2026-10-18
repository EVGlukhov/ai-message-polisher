import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorError } from './editor-error';

describe('EditorError', () => {
  let component: EditorError;
  let fixture: ComponentFixture<EditorError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorError],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
