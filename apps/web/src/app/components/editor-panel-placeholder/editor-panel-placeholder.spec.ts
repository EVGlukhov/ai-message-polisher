import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPanelPlaceholder } from './editor-panel-placeholder';

describe('EditorPanelPlaceholder', () => {
  let component: EditorPanelPlaceholder;
  let fixture: ComponentFixture<EditorPanelPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPanelPlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPanelPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
