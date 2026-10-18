import { Component, computed, effect, inject, signal } from '@angular/core';

import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { EditorInfo } from '../editor-info/editor-info';
import { EditorFooter } from '../editor-footer/editor-footer';
import { EditorPanel } from '../editor-panel/editor-panel';
import { EditorPanelHeader } from '../editor-panel-header/editor-panel-header';
import { EditorPanelHeading } from '../editor-panel-heading/editor-panel-heading';
import { form, FormField } from '@angular/forms/signals';
import { Textarea } from '../textarea/textarea';
import { PolishStore } from '../../state/polish-store';
import { Language } from '@ai-message-polisher/contracts';

@Component({
  selector: 'app-editor-composer',
  imports: [
    Icon,
    Button,
    Textarea,
    FormField,
    EditorInfo,
    EditorFooter,
    EditorPanel,
    EditorPanelHeader,
    EditorPanelHeading,
  ],
  templateUrl: './editor-composer.html',
  styleUrl: './editor-composer.css',
})
export class EditorComposer {
  readonly store = inject(PolishStore);
  readonly messageModel = signal({ text: '' });
  readonly messageForm = form(this.messageModel);

  readonly wordCount = computed(() => {
    const text = this.messageModel().text.trim();
    return text ? text.split(/\s+/u).length : 0;
  });

  readonly canPolish = computed(() => {
    return this.wordCount() > 0 && !this.store.loading();
  });

  constructor() {
    let previousResetVersion = this.store.resetVersion();

    effect(() => {
      const resetVersion = this.store.resetVersion();

      if (resetVersion !== previousResetVersion) {
        previousResetVersion = resetVersion;
        this.messageModel.set({ text: '' });
      }
    });

    effect(() => {
      const language = this.detectLanguage(this.messageModel().text);

      if (language) {
        this.store.setLanguage(language);
      }
    });
  }

  protected clear() {
    this.messageModel.set({ text: '' });
  }

  protected polish() {
    this.store.polish({
      text: this.messageModel().text,
      language: this.store.language(),
      tone: this.store.tone(),
    });
  }

  private detectLanguage(text: string): Language | null {
    const cyrillicCount = text.match(/\p{Script=Cyrillic}/gu)?.length ?? 0;
    const latinCount = text.match(/\p{Script=Latin}/gu)?.length ?? 0;

    if (cyrillicCount > latinCount) return Language.Russian;
    if (latinCount > cyrillicCount) return Language.English;

    return null;
  }
}
