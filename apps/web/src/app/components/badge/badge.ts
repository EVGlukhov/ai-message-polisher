import { Component } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-badge',
  imports: [TypographyDirective],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {}
