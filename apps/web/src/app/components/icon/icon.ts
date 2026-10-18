import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const ICONS = {
  sparkle: '/assets/icons/sparkle.svg',
  message: '/assets/icons/message.svg',
  castle: '/assets/icons/castle.svg',
  copy: '/assets/icons/copy.svg',
  'chevron-down': '/assets/icons/chevron-down.svg',
  success: '/assets/icons/success.svg',
} as const;

export type IconName = keyof typeof ICONS;

const svgRequests = new Map<string, Promise<string>>();

function loadSvg(url: string): Promise<string> {
  const cachedRequest = svgRequests.get(url);
  if (cachedRequest) return cachedRequest;

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load icon: ${url} (${response.status})`);
      }
      return response.text();
    })
    .catch((error: unknown) => {
      svgRequests.delete(url);
      throw error;
    });

  svgRequests.set(url, request);
  return request;
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly svgResource = resource({
    params: () => ICONS[this.name()],
    loader: ({ params: url }) => loadSvg(url),
  });
  protected readonly safeSvg = computed(() => {
    if (!this.svgResource.hasValue()) return null;

    // Only trust SVG files bundled with this app and selected from the fixed map above.
    return this.sanitizer.bypassSecurityTrustHtml(this.svgResource.value());
  });
}
