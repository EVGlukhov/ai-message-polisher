import { Component, inject } from '@angular/core';
import { EditorPanel } from '../editor-panel/editor-panel';
import { EditorPanelHeader } from '../editor-panel-header/editor-panel-header';
import { PolishStore } from '../../state/polish-store';
import { EditorPanelHeading } from '../editor-panel-heading/editor-panel-heading';
import { Badge } from '../badge/badge';
import { EditorPanelPlaceholder } from '../editor-panel-placeholder/editor-panel-placeholder';
import { EditorFooter } from '../editor-footer/editor-footer';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

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
  ],
  templateUrl: './editor-result.html',
  styleUrl: './editor-result.css',
})
export class EditorResult {
  readonly polishStore = inject(PolishStore);
}
