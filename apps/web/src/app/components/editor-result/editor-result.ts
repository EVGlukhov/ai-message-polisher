import { Component, inject, signal, computed } from '@angular/core';
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
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-editor-result',
  imports: [
    EditorPanel,
    EditorPanelHeader,
    EditorPanelHeading,
    Badge,
    EditorPanelPlaceholder,
    EditorFooter,
    Button,
    Icon,
    Textarea,
    FormField,
  ],
  templateUrl: './editor-result.html',
  styleUrl: './editor-result.css',
})
export class EditorResult {
  readonly polishStore = inject(PolishStore);
  readonly resultModel = signal({ text: '' });
  readonly resultForm = form(this.resultModel);

  protected canCopy = computed(() => {
    return this.resultModel().text.trim().length > 0;
  });
}
