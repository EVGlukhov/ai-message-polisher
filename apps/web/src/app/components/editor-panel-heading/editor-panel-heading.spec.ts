import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPanelHeading } from './editor-panel-heading';

describe('EditorPanelHeading', () => {
  let component: EditorPanelHeading;
  let fixture: ComponentFixture<EditorPanelHeading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPanelHeading],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPanelHeading);
    fixture.componentRef.setInput('iconName', 'sparkle');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
