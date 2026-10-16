import { Component, input } from '@angular/core';

@Component({
  selector: 'app-editor-info',
  imports: [],
  templateUrl: './editor-info.html',
  styleUrl: './editor-info.css',
})
export class EditorInfo {
  readonly wordCount = input(0);
}
