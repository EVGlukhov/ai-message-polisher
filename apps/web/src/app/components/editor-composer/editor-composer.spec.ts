import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Tone } from '@ai-message-polisher/contracts';

import { PolishApi } from '../../api/polish-api';
import { EditorComposer } from './editor-composer';

describe('EditorComposer', () => {
  let component: EditorComposer;
  let fixture: ComponentFixture<EditorComposer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComposer],
      providers: [
        {
          provide: PolishApi,
          useValue: {
            polish: vi.fn(() => of({ text: 'Hello', changes: [] })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComposer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the polish button disabled for empty or whitespace-only input', () => {
    const polishButton = fixture.nativeElement.querySelectorAll('app-button button')[1];
    expect(polishButton.disabled).toBe(true);

    component.messageModel.set({ text: '   \n  ' });
    fixture.detectChanges();

    expect(polishButton.disabled).toBe(true);
  });

  it('enables polish for non-empty text and disables it until the text changes again', async () => {
    const polishButton: HTMLButtonElement =
      fixture.nativeElement.querySelectorAll('app-button button')[1];
    vi.spyOn(component.store, 'polish');

    component.messageModel.set({ text: 'Hello' });
    fixture.detectChanges();
    expect(polishButton.disabled).toBe(false);

    polishButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.store.polish).toHaveBeenCalledWith({
      text: 'Hello',
      language: component.store.language(),
      tone: component.store.tone(),
    });
    expect(polishButton.disabled).toBe(true);

    component.messageModel.set({ text: 'Hello again' });
    fixture.detectChanges();
    expect(polishButton.disabled).toBe(false);

    component.messageModel.set({ text: 'Hello' });
    fixture.detectChanges();
    expect(polishButton.disabled).toBe(true);

    component.store.updateSettings({
      language: component.store.language(),
      tone: Tone.Friendly,
    });
    fixture.detectChanges();
    expect(polishButton.disabled).toBe(false);

    component.store.updateSettings({
      language: component.store.language(),
      tone: Tone.Preserve,
    });
    fixture.detectChanges();
    expect(polishButton.disabled).toBe(true);
  });
});
