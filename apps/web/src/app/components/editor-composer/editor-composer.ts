import { Component, computed, signal } from '@angular/core';

import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { EditorInfo } from '../editor-info/editor-info';
import { EditorFooter } from '../editor-footer/editor-footer';
import { EditorPanel } from '../editor-panel/editor-panel';
import { EditorPanelHeader } from '../editor-panel-header/editor-panel-header';
import { EditorPanelHeading } from '../editor-panel-heading/editor-panel-heading';
import { form, FormField } from '@angular/forms/signals';
import { Textarea } from '../textarea/textarea';

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
  readonly messageModel = signal({ text: '' });
  readonly messageForm = form(this.messageModel);

  protected clear() {
    this.messageModel.set({ text: '' });
  }

  readonly wordCount = computed(() => {
    const text = this.messageModel().text.trim();
    return text ? text.split(/\s+/u).length : 0;
  });

  readonly canRewrite = computed(() => {
    return this.wordCount() > 0;
  });
}
