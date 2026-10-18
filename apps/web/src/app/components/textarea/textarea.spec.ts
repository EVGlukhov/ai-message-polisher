import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textarea } from './textarea';

describe('Textarea', () => {
  let component: Textarea;
  let fixture: ComponentFixture<Textarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textarea],
    }).compileComponents();

    fixture = TestBed.createComponent(Textarea);
    fixture.componentRef.setInput('label', 'Message');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the label as the textarea accessible name', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

    expect(textarea.getAttribute('aria-label')).toBe('Message');
  });

  it('updates its value when the user types', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'Hello';
    textarea.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('Hello');
  });
});
