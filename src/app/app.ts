import { Component, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Workspace } from './components/workspace/workspace';
import { PageHeader } from './components/page-header/page-header';
import { EditorToolbar } from './components/editor-toolbar/editor-toolbar';

@Component({
  selector: 'app-root',
  imports: [Layout, Workspace, PageHeader, EditorToolbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
