import { Component } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-editor-panel-placeholder',
  imports: [TypographyDirective, Icon],
  templateUrl: './editor-panel-placeholder.html',
  styleUrl: './editor-panel-placeholder.css',
})
export class EditorPanelPlaceholder {}
