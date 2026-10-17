import { Directive, input } from '@angular/core';

export type TypographyVariant =
  | 'pageTitle'
  | 'brand'
  | 'panelTitle'
  | 'body'
  | 'bodyMuted'
  | 'emptyStateTitle'
  | 'caption'
  | 'sectionLabel'
  | 'highlight';

@Directive({
  selector: '[appTypography]',
  standalone: true,
  host: {
    '[class.type-page-title]': "variant() === 'pageTitle'",
    '[class.type-brand]': "variant() === 'brand'",
    '[class.type-panel-title]': "variant() === 'panelTitle'",
    '[class.type-body]': "variant() === 'body'",
    '[class.type-body-muted]': "variant() === 'bodyMuted'",
    '[class.type-empty-state-title]': "variant() === 'emptyStateTitle'",
    '[class.type-caption]': "variant() === 'caption'",
    '[class.type-section-label]': "variant() === 'sectionLabel'",
    '[class.type-highlight]': "variant() === 'highlight'",
  },
})
export class TypographyDirective {
  readonly variant = input.required<TypographyVariant>({ alias: 'appTypography' });
}
