import { Component } from '@angular/core';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-header',
  imports: [TypographyDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
