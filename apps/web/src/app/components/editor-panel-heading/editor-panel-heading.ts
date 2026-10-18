import { Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-editor-panel-heading',
  imports: [Icon, TypographyDirective],
  templateUrl: './editor-panel-heading.html',
})
export class EditorPanelHeading {
  iconName = input.required<IconName>();
}
