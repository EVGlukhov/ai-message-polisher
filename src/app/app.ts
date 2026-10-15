import { Component, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Workspace } from './components/workspace/workspace';
import { Introduction } from './components/introduction/introduction';
import { Settings } from './components/settings/settings';

@Component({
  selector: 'app-root',
  imports: [Layout, Workspace, Introduction, Settings],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
