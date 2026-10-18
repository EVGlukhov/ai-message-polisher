import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { Icon } from '../icon/icon';
import { TypographyDirective } from '../../directives/typography';

export type SelectOption = {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrl: './select.css',
  imports: [Icon, TypographyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select implements FormValueControl<string> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly value = model<string>('');
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectOption[]>();
  readonly disabled = input<boolean>(false);
  readonly touch = output<void>();
  readonly id = input.required<string>();
  readonly isOpen = signal(false);
  readonly activeIndex = signal(0);

  readonly selectedOption = computed(
    () => this.options().find((option) => option.value === this.value()) ?? null,
  );

  protected toggle(): void {
    if (this.disabled()) return;

    this.isOpen.update((open) => !open);

    if (this.isOpen()) {
      const selectedIndex = this.options().findIndex((option) => option.value === this.value());
      this.activeIndex.set(Math.max(selectedIndex, 0));
    }
  }

  @HostListener('document:click', ['$event'])
  protected closeOnOutsideClick(event: MouseEvent): void {
    if (
      this.isOpen() &&
      event.target instanceof Node &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isOpen.set(false);
    }
  }

  protected setActive(index: number): void {
    this.activeIndex.set(index);
  }

  protected selectOption(option: SelectOption): void {
    if (option.disabled) return;

    this.value.set(option.value);
    this.isOpen.set(false);
    this.touch.emit();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!this.isOpen()) {
        this.isOpen.set(true);
        return;
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const count = this.options().length;
      if (count) {
        this.activeIndex.update((index) => (index + direction + count) % count);
      }
    }
  }
}
