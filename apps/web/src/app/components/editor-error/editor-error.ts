import { Component, input } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-editor-error',
  imports: [TypographyDirective, Icon],
  templateUrl: './editor-error.html',
  styleUrl: './editor-error.css',
})
export class EditorError {
  readonly description = input.required<string>();
}
