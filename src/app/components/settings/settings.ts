import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Select, SelectOption } from '../select/select';
import { Button } from '../button/button';

@Component({
  selector: 'app-settings',
  imports: [FormField, Select, Button],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  readonly settingsModel = signal({
    language: 'ru',
    tone: 'preserve',
  });
  readonly settingsForm = form(this.settingsModel);
  readonly languageOptions: readonly SelectOption[] = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'Английский' },
  ];
  readonly toneOptions: readonly SelectOption[] = [
    { value: 'preserve', label: 'Сохранить мой тон' },
    { value: 'neutral', label: 'Нейтральный' },
    { value: 'friendly', label: 'Дружелюбный' },
    { value: 'formal', label: 'Официальный' },
  ];

  restoreDefaults(): void {
    this.settingsModel.set({
      language: 'ru',
      tone: 'preserve',
    });
  }
}
