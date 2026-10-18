import type { PolishResponse } from '@ai-message-polisher/contracts';
import { isLanguage, isRecord, isTone } from './guards';
import { polishWithGigaChat } from '../services/gigachat-client';

type PolishRequestResult =
  | { status: 200; body: PolishResponse }
  | { status: 400 | 502; body: { error: string } };

export async function handlePolishRequest(
  body: unknown,
  options: { completionTimeoutMs?: number } = {},
): Promise<PolishRequestResult> {
  if (!isRecord(body)) {
    return { status: 400, body: { error: 'Некорректный запрос.' } };
  }

  const { text, language, tone } = body;

  if (typeof text !== 'string' || !text.trim() || text.length > 20_000) {
    return {
      status: 400,
      body: { error: 'Введите текст до 20 000 символов.' },
    };
  }

  if (!isLanguage(language) || !isTone(tone)) {
    return {
      status: 400,
      body: { error: 'Неизвестный язык или тон.' },
    };
  }

  try {
    const result = await polishWithGigaChat(
      text,
      language,
      tone,
      options.completionTimeoutMs,
    );
    return { status: 200, body: result };
  } catch (error: unknown) {
    console.error('GigaChat polish request failed:', error);
    return {
      status: 502,
      body: { error: 'Не удалось обработать текст. Попробуйте ещё раз.' },
    };
  }
}
