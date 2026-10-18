import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { TypographyDirective } from '../../directives/typography';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.html',
  imports: [TypographyDirective],
  styleUrl: './textarea.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea implements FormValueControl<string> {
  readonly value = model('');
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly touch = output<void>();

  protected handleInput(event: Event): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.value.set(event.target.value);
    }
  }
}
