import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Icon } from './icon';

describe('Icon', () => {
  let fixture: ComponentFixture<Icon>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await TestBed.configureTestingModule({
      imports: [Icon],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'sparkle');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads and renders the requested SVG', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 18 18"><path d="M1 1" /></svg>',
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fetchMock).toHaveBeenCalledWith('/assets/icons/sparkle.svg');
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('path')?.getAttribute('d')).toBe('M1 1');
  });

  it('shows an error when the SVG request fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Icon failed to load');
  });
});
