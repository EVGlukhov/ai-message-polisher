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
    fixture.componentRef.setInput('description', 'Не удалось обработать текст.');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the supplied error description', () => {
    expect(fixture.nativeElement.textContent).toContain('Не удалось обработать текст.');
  });
});
