import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPanels } from './editor-panels';

describe('EditorPanels', () => {
  let component: EditorPanels;
  let fixture: ComponentFixture<EditorPanels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPanels],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPanels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
