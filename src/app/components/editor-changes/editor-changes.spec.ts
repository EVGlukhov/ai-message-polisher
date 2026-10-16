import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorChanges } from './editor-changes';

describe('EditorChanges', () => {
  let component: EditorChanges;
  let fixture: ComponentFixture<EditorChanges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorChanges],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorChanges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
