import 'dotenv/config';
import express from 'express';
import { error } from 'node:console';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY should be defined');
}

const app = express();
const openai = new OpenAI({ apiKey });

app.use(express.json({ limit: '32kb' }));

app.post('/api/polish', async (req, res) => {
  const text: unknown = req.body?.text;

  if (typeof text !== 'string' || !text.trim() || text.length > 20_000) {
    res.status(400).json({ error: 'Provide text of up to 20,000 characters.' });
    return;
  }

  try {
    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      instructions:
        'Correct grammar, spelling, and punctuation. Preserve the original meaning, tone, and language. Return only the corrected text.',
      input: text,
    });

    if (!response.output_text.trim()) {
      res.status(502).json({ error: 'The AI service returned no text.' });
      return;
    }

    res.json({ text: response.output_text });
  } catch (error) {
    console.error('Text rewrite failed:', error);
    res
      .status(502)
      .json({ error: 'Could not polish the text. Please try again.' });
  }
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
