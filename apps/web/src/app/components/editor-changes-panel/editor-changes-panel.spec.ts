import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorChangesPanel } from './editor-changes-panel';

describe('EditorChangesPanel', () => {
  let component: EditorChangesPanel;
  let fixture: ComponentFixture<EditorChangesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorChangesPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorChangesPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
