import 'dotenv/config';
import express from 'express';
import { buildPolishInstructions } from './api/builder';
import { polishResponseSchema } from './api/schema';
import { randomUUID } from 'node:crypto';
import { isLanguage, isPolishResponse, isRecord, isTone } from './api/guards';
import { URLSearchParams } from 'node:url';

const gigachatModel = process.env.GIGACHAT_MODEL ?? 'GigaChat';
const gigachatScope = process.env.GIGACHAT_SCOPE ?? 'GIGACHAT_API_PERS';

let cachedAccessToken: string | undefined;
let tokenValidUntil = 0;

const app = express();

app.use(express.json({ limit: '32kb' }));

async function getGigaChatAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenValidUntil) {
    return cachedAccessToken;
  }

  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) {
    throw new Error('GIGACHAT_AUTH_KEY should be defined');
  }

  const response = await fetch(
    'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        RqUID: randomUUID(),
      },
      body: new URLSearchParams({ scope: gigachatScope }),
      signal: AbortSignal.timeout(15_000),
    },
  );

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

app.post('/api/polish', async (req, res) => {
  const body: unknown = req.body;

  if (!isRecord(body)) {
    res.status(400).json({ error: 'Некорректный запрос.' });
    return;
  }

  const { text, language, tone } = body;

  if (typeof text !== 'string' || !text.trim() || text.length > 20_000) {
    res.status(400).json({ error: 'Введите текст до 20 000 символов.' });
    return;
  }

  if (!isLanguage(language) || !isTone(tone)) {
    res.status(400).json({ error: 'Неизвестный язык или тон.' });
    return;
  }

  try {
    const accessToken = await getGigaChatAccessToken();
    const gigachatResponse = await fetch(
      `https://gigachat.devices.sberbank.ru/api/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: gigachatModel,
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
            {
              role: 'user',
              content: text,
            },
          ],
        }),
        signal: AbortSignal.timeout(120_000),
      },
    );

    if (!gigachatResponse.ok) {
      throw new Error(
        `GigaChat completion request failed with HTTP ${gigachatResponse.status}`,
      );
    }

    const result: unknown = await gigachatResponse.json();

    if (
      !isRecord(result) ||
      !Array.isArray(result.choices) ||
      !result.choices[0]
    ) {
      res.status(502).json({ error: 'ИИ вернул некорректный ответ.' });
      return;
    }

    const choice = result.choices[0];
    if (!isRecord(choice) || !isRecord(choice.message)) {
      res.status(502).json({ error: 'ИИ вернул некорректный ответ.' });
      return;
    }

    const content = choice.message.content;

    console.log('content', content);

    if (typeof content !== 'string' || !content.trim()) {
      res.status(502).json({ error: 'ИИ не вернул текст.' });
      return;
    }

    let parsedResponse: unknown;
    try {
      parsedResponse = JSON.parse(content);
    } catch (error) {
      console.error('GigaChat returned invalid JSON:', error);
      res.status(502).json({ error: 'ИИ вернул некорректный ответ.' });
      return;
    }

    if (!isPolishResponse(parsedResponse)) {
      res.status(502).json({ error: 'ИИ вернул некорректный ответ.' });
      return;
    }

    res.json({
      text: parsedResponse.text.trim(),
      changes: parsedResponse.changes,
    });
  } catch (error: unknown) {
    console.error('GigaChat polish request failed:', error);

    if (!res.headersSent) {
      res.status(502).json({
        error: 'Не удалось обработать текст. Попробуйте ещё раз.',
      });
    }
  }
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
