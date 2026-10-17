import { Component } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';
import { EditorChangesPanel } from '../editor-changes-panel/editor-changes-panel';

@Component({
  selector: 'app-editor-changes',
  imports: [TypographyDirective, EditorChangesPanel],
  templateUrl: './editor-changes.html',
  styleUrl: './editor-changes.css',
})
export class EditorChanges {}
