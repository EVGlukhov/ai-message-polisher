import { Component } from '@angular/core';
import { Bar } from '../bar/bar';
import { Brand } from '../brand/brand';

@Component({
  selector: 'app-page-layout',
  imports: [Bar, Brand],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.css',
})
export class PageLayout {}
