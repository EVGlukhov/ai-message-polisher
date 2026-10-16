import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComposer } from './editor-composer';

describe('EditorComposer', () => {
  let component: EditorComposer;
  let fixture: ComponentFixture<EditorComposer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComposer],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComposer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
