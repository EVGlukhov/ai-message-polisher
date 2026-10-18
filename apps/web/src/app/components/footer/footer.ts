import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-footer',
  imports: [Icon, TypographyDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
