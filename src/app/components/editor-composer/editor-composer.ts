import { Component, signal } from '@angular/core';

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
}
