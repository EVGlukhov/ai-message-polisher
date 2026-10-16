import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPanelHeader } from './editor-panel-header';

describe('EditorPanelHeader', () => {
  let component: EditorPanelHeader;
  let fixture: ComponentFixture<EditorPanelHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPanelHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPanelHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
