import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorChanges } from './components/editor-changes/editor-changes';
import { EditorComposer } from './components/editor-composer/editor-composer';
import { EditorPanels } from './components/editor-panels/editor-panels';
import { EditorResult } from './components/editor-result/editor-result';
import { EditorToolbar } from './components/editor-toolbar/editor-toolbar';

@NgModule({
  declarations: [],
  imports: [EditorChanges, EditorComposer, EditorPanels, EditorResult, EditorToolbar],
  exports: [EditorChanges, EditorComposer, EditorPanels, EditorResult, EditorToolbar],
})
export class EditorModule {}
