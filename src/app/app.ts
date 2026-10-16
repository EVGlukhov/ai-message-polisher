import { Component, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Workspace } from './components/workspace/workspace';
import { PageHeader } from './components/page-header/page-header';
import { Settings } from './components/settings/settings';

@Component({
  selector: 'app-root',
  imports: [Layout, Workspace, PageHeader, Settings],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
