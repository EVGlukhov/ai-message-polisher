import { signal, type WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tone } from '@ai-message-polisher/contracts';
import { PolishStore } from '../../state/polish-store';
import { EditorResult } from './editor-result';

describe('EditorResult', () => {
  let fixture: ComponentFixture<EditorResult>;
  let store: {
    result: WritableSignal<string>;
    tone: WritableSignal<Tone>;
    loading: WritableSignal<boolean>;
  };

  beforeEach(async () => {
    store = {
      result: signal(''),
      tone: signal(Tone.Preserve),
      loading: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [EditorResult],
      providers: [{ provide: PolishStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorResult);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('shows the placeholder when there is no result', () => {
    expect(fixture.nativeElement.querySelector('app-editor-panel-placeholder')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
  });

  it('shows the result in a read-only textarea', async () => {
    store.result.set('Hello, world!');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement | null = fixture.nativeElement.querySelector('textarea');

    expect(textarea?.value).toBe('Hello, world!');
    expect(textarea?.readOnly).toBe(true);
  });

  it('shows the message for the selected tone', async () => {
    store.result.set('Текст готов');
    store.tone.set(Tone.Friendly);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Готово. Текст стал дружелюбнее.');
  });

  it('disables copy when there is no result', () => {
    const button: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('app-button button');

    expect(button?.disabled).toBe(true);
  });
});
