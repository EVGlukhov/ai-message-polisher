import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Tone } from '@ai-message-polisher/contracts';
import { EditorPanel } from '../editor-panel/editor-panel';
import { EditorPanelHeader } from '../editor-panel-header/editor-panel-header';
import { PolishStore } from '../../state/polish-store';
import { EditorPanelHeading } from '../editor-panel-heading/editor-panel-heading';
import { Badge } from '../badge/badge';
import { EditorPanelPlaceholder } from '../editor-panel-placeholder/editor-panel-placeholder';
import { EditorFooter } from '../editor-footer/editor-footer';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Textarea } from '../textarea/textarea';
import { EditorError } from '../editor-error/editor-error';
import { TypographyDirective } from '../../directives/typography';

const toneMessages: Record<Tone, string> = {
  [Tone.Preserve]: 'Готово. Тон остался вашим.',
  [Tone.Neutral]: 'Готово. Текст приведён к нейтральному тону.',
  [Tone.Friendly]: 'Готово. Текст стал дружелюбнее.',
  [Tone.Formal]: 'Готово. Текст приведён к официальному тону.',
  [Tone.Vulgar]: 'Готово. Сохранён разговорный стиль.',
};

@Component({
  selector: 'app-editor-result',
  imports: [
    EditorPanel,
    EditorPanelHeader,
    EditorPanelHeading,
    Badge,
    EditorPanelPlaceholder,
    EditorFooter,
    EditorError,
    Button,
    Icon,
    Textarea,
    FormField,
    TypographyDirective,
  ],
  templateUrl: './editor-result.html',
})
export class EditorResult {
  readonly store = inject(PolishStore);
  readonly resultModel = signal({ text: '' });
  readonly resultForm = form(this.resultModel);
  readonly toneMessage = computed(() => toneMessages[this.store.tone()]);
  readonly copyStatus = signal<'success' | 'error' | null>(null);

  constructor() {
    effect(() => {
      this.resultModel.set({ text: this.store.result() });
    });
    effect(() => {
      if (this.store.loading()) {
        this.copyStatus.set(null);
      }
    });
  }

  protected canCopy = computed(() => {
    return this.resultModel().text.trim().length > 0;
  });

  protected async copyResult(): Promise<void> {
    this.copyStatus.set(null);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is unavailable');
      }

      await navigator.clipboard.writeText(this.resultModel().text);
      this.copyStatus.set('success');
    } catch (error: unknown) {
      console.error('Failed to copy polished text:', error);
      this.copyStatus.set('error');
    }
  }
}
