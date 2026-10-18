import { Component, inject, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { EditorToolbar } from './components/editor-toolbar/editor-toolbar';
import { EditorComposer } from './components/editor-composer/editor-composer';
import { EditorResult } from './components/editor-result/editor-result';
import { EditorChanges } from './components/editor-changes/editor-changes';
import { PolishStore } from './state/polish-store';

@Component({
  selector: 'app-root',
  imports: [Layout, Header, Footer, EditorToolbar, EditorComposer, EditorResult, EditorChanges],
  templateUrl: './app.html',
})
export class App {
  readonly store = inject(PolishStore);
  protected readonly title = signal('ai-message-polisher');
}
