import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Select, SelectOption } from '../select/select';
import { Button } from '../button/button';
import { PolishStore } from '../../state/polish-store';
import { Language, Tone } from '@ai-message-polisher/contracts';

@Component({
  selector: 'app-editor-toolbar',
  imports: [FormField, Select, Button],
  templateUrl: './editor-toolbar.html',
  styleUrl: './editor-toolbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbar {
  readonly store = inject(PolishStore);
  readonly settingsModel = signal({
    language: this.store.language(),
    tone: this.store.tone(),
  });
  readonly settingsForm = form(this.settingsModel);

  constructor() {
    effect(() => this.store.updateSettings(this.settingsModel()));

    effect(() => {
      const language = this.store.language();

      this.settingsModel.update((settings) =>
        settings.language === language ? settings : { ...settings, language },
      );
    });
  }

  readonly languageOptions: readonly SelectOption[] = [
    { value: Language.Russian, label: 'Русский' },
    { value: Language.English, label: 'Английский' },
  ];
  readonly toneOptions: readonly SelectOption[] = [
    { value: Tone.Preserve, label: 'Сохранить мой тон' },
    { value: Tone.Neutral, label: 'Нейтральный' },
    { value: Tone.Friendly, label: 'Дружелюбный' },
    { value: Tone.Formal, label: 'Официальный' },
    { value: Tone.Vulgar, label: 'Разговорный, с ненормативной лексикой' },
  ];

  restoreDefaults(): void {
    this.store.resetEditor();

    this.settingsModel.set({
      language: Language.Russian,
      tone: Tone.Preserve,
    });
  }
}
