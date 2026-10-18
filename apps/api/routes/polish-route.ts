import { Router } from 'express';
import { isLanguage, isRecord, isTone } from '../polish/guards';
import { polishWithGigaChat } from '../services/gigachat-client';

export const polishRouter = Router();

polishRouter.post('/polish', async (req, res) => {
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
    const result = await polishWithGigaChat(text, language, tone);
    res.json(result);
  } catch (error: unknown) {
    console.error('GigaChat polish request failed:', error);
    res.status(502).json({
      error: 'Не удалось обработать текст. Попробуйте ещё раз.',
    });
  }
});
