import { Component, signal } from '@angular/core';
import { Layout } from './components/layout/layout';
import { Brand } from './components/brand/brand';
import { Bar } from './components/bar/bar';

@Component({
  selector: 'app-root',
  imports: [Layout, Bar, Brand],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ai-message-polisher');
}
