import { Component } from '@angular/core';
import { EditorPanel } from '../editor-panel/editor-panel';
import { EditorPanelHeader } from '../editor-panel-header/editor-panel-header';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-editor-result',
  imports: [EditorPanel, EditorPanelHeader],
  templateUrl: './editor-result.html',
  styleUrl: './editor-result.css',
})
export class EditorResult {}
