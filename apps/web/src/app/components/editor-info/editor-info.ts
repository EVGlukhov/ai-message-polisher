import { Component, input } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-editor-info',
  imports: [TypographyDirective],
  templateUrl: './editor-info.html',
})
export class EditorInfo {
  readonly wordCount = input(0);
}
