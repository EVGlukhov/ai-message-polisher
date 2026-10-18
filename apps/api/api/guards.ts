import {
  Language,
  Tone,
  type Language as LanguageValue,
  type PolishChange,
  type PolishResponse,
  type Tone as ToneValue,
} from '@ai-message-polisher/contracts';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isLanguage(value: unknown): value is LanguageValue {
  return Object.values(Language).some((language) => language === value);
}

export function isTone(value: unknown): value is ToneValue {
  return Object.values(Tone).some((tone) => tone === value);
}

export function isPolishChange(value: unknown): value is PolishChange {
  return (
    isRecord(value) &&
    typeof value.category === 'string' &&
    typeof value.original === 'string' &&
    typeof value.replacement === 'string' &&
    typeof value.explanation === 'string'
  );
}

export function isPolishResponse(value: unknown): value is PolishResponse {
  return (
    isRecord(value) &&
    typeof value.text === 'string' &&
    value.text.trim().length > 0 &&
    Array.isArray(value.changes) &&
    value.changes.every(isPolishChange)
  );
}
