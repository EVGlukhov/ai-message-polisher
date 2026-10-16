import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type SelectOption = {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select implements FormValueControl<string> {
  readonly value = model<string>('');
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectOption[]>();
  readonly disabled = input<boolean>(false);
  readonly touch = output<void>();

  protected handleChange(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      this.value.set(event.target.value);
    }
  }
}
