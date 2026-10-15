import { Component } from '@angular/core';
import { Bar } from '../bar/bar';
import { Brand } from '../brand/brand';

@Component({
  selector: 'app-layout',
  imports: [Bar, Brand],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
