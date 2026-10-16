import { Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

@Component({
  selector: 'app-editor-panel-heading',
  imports: [Icon],
  templateUrl: './editor-panel-heading.html',
  styleUrl: './editor-panel-heading.css',
})
export class EditorPanelHeading {
  iconName = input.required<IconName>();
}
