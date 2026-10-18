import { randomUUID } from 'node:crypto';
import { URLSearchParams } from 'node:url';
import type {
  Language as LanguageValue,
  PolishResponse,
  Tone as ToneValue,
} from '@ai-message-polisher/contracts';
import { buildPolishInstructions } from '../polish/builder';
import { isPolishResponse, isRecord } from '../polish/guards';
import { polishResponseSchema } from '../polish/schema';

const model = process.env.GIGACHAT_MODEL ?? 'GigaChat';
const scope = process.env.GIGACHAT_SCOPE ?? 'GIGACHAT_API_PERS';

const oauthUrl =
  process.env.GIGACHAT_OAUTH_URL ??
  'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

const completionsUrl =
  process.env.GIGACHAT_COMPLETIONS_URL ??
  'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

let cachedAccessToken: string | undefined;
let tokenValidUntil = 0;

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenValidUntil) {
    return cachedAccessToken;
  }

  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) {
    throw new Error('GIGACHAT_AUTH_KEY should be defined');
  }

  const response = await fetch(oauthUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      RqUID: randomUUID(),
    },
    body: new URLSearchParams({ scope }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(
      `GigaChat token request failed with HTTP ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (
    !isRecord(data) ||
    typeof data.access_token !== 'string' ||
    typeof data.expires_at !== 'number'
  ) {
    throw new Error('GigaChat returned an invalid token response');
  }

  cachedAccessToken = data.access_token;
  tokenValidUntil = data.expires_at;

  return cachedAccessToken;
}

export async function polishWithGigaChat(
  text: string,
  language: LanguageValue,
  tone: ToneValue,
): Promise<PolishResponse> {
  const accessToken = await getAccessToken();

  const response = await fetch(completionsUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      stream: false,
      response_format: {
        type: 'json_schema',
        schema: polishResponseSchema,
        strict: true,
      },
      messages: [
        {
          role: 'system',
          content: buildPolishInstructions(language, tone),
        },
        { role: 'user', content: text },
      ],
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!response.ok) {
    throw new Error(
      `GigaChat completion request failed with HTTP ${response.status}`,
    );
  }

  const result: unknown = await response.json();

  if (
    !isRecord(result) ||
    !Array.isArray(result.choices) ||
    !result.choices[0] ||
    !isRecord(result.choices[0]) ||
    !isRecord(result.choices[0].message)
  ) {
    throw new Error('GigaChat returned an invalid response');
  }

  const content = result.choices[0].message.content;

  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('GigaChat returned no text');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('GigaChat returned invalid JSON');
  }

  if (!isPolishResponse(parsed)) {
    throw new Error('GigaChat returned an invalid response');
  }

  return {
    text: parsed.text.trim(),
    changes: parsed.changes,
  };
}
