import { BuiltinType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-700 disabled:bg-transparent disabled:text-zinc-600 disabled:hover:bg-zinc-100 disabled:hover:text-zinc-800 focus-visible:outline-violet-600',
  secondary:
    'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 focus-visible:outline-violet-600',
  ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-violet-600',
};

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('ghost');
  readonly disabled = input(false);
  readonly pressed = output<MouseEvent>();

  protected readonly classes = computed(
    () =>
      `inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 not-disabled:cursor-pointer ${variantClasses[this.variant()]}`,
  );
}
