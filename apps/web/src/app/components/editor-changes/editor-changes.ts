import { Component, inject } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';
import { EditorChangesPanel } from '../editor-changes-panel/editor-changes-panel';
import { PolishStore } from '../../state/polish-store';

@Component({
  selector: 'app-editor-changes',
  imports: [TypographyDirective, EditorChangesPanel],
  templateUrl: './editor-changes.html',
  styleUrl: './editor-changes.css',
})
export class EditorChanges {
  readonly store = inject(PolishStore);
}
