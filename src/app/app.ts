import { Component, signal } from '@angular/core';
import { PageLayout } from './components/page-layout/page-layout';
import { PageWrapper } from './components/page-wrapper/page-wrapper';
import { PageHeader } from './components/page-header/page-header';
import { PageFooter } from './components/page-footer/page-footer';
import { EditorModule } from './modules/editor/editor-module';

@Component({
  selector: 'app-root',
  imports: [PageLayout, PageWrapper, PageHeader, PageFooter, PageWrapper, EditorModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
