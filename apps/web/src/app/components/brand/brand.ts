import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-brand',
  imports: [Icon, TypographyDirective],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
})
export class Brand {}
