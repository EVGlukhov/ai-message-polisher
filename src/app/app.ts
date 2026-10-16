import { Component, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { EditorModule } from './modules/editor/editor-module';

@Component({
  selector: 'app-root',
  imports: [Layout, Header, Footer, EditorModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
