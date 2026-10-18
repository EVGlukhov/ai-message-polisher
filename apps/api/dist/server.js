// server.ts
import "dotenv/config";
import express from "express";

// api/builder.ts
import {
  Language,
  Tone
} from "@ai-message-polisher/contracts";
var languageNames = {
  [Language.Russian]: "Russian",
  [Language.English]: "English"
};
var toneInstructions = {
  [Tone.Preserve]: "Keep the original tone as closely as possible.",
  [Tone.Neutral]: "Use a clear, neutral, professional tone.",
  [Tone.Friendly]: "Use a warm, approachable tone. Remove profanity that makes the message sound hostile or unnecessarily crude. When removing profanity, remove the complete word and adjust surrounding text only as needed. Never disguise profanity as a spelling or punctuation correction.",
  [Tone.Formal]: "Use a polite, formal tone suitable for professional communication",
  [Tone.Vulgar]: "Use casual language with occasional profanity only when it fits the original context. Do not use slurs, threats, or profanity aimed at insulting or demeanin a person. Do not add profanity if it would change the meaning or make the text inappropriate for its context."
};
function buildPolishInstructions(language, tone) {
  return `
    You are a careful proofreader and editor.
    Write the polished text and explanations in ${languageNames[language]}.
    ${toneInstructions[tone]}
    Correct grammar, spelling, punctuation, and awkward wording.
    Return the complete message, preserving every sentence and paragraph.
    Never summarize, shorten, or omit any part of the input. Preserve its
    meaning, facts, names, and intent.
    Treat names as user-provided. Do not alter or claim to correct a name
    unless the input itself provides clear evidence of a typo.

    The "changes" array must contain only actual edits made to the input.
    If the input needs no edits, return the original text unchanged and set
    "changes" to an empty array. Never add a change saying the text is already
    clear, correct, or needs no changes.

    For each actual edit, return one object:
    - category: a short label for the kind of correction, such as "Grammar",
      "Spelling", "Punctuation", or "Clarity".
    - original: the exact text span from the user's input that was changed.
    - replacement: the corrected text that replaces that exact span.
    - explanation: a brief, user-friendly explanation of why the change was made.

    Do not invent corrections or include unchanged text as a correction.
    Every change must have different "original" and "replacement" values.
    Use the correct category for each edit. Do not label a tone or wording edit
    as spelling or punctuation. Each "original" must be an exact span in the
    input, and applying all changes in order must produce the returned "text".
    Keep original and replacement limited to the smallest useful text span.
  `.trim();
}

// api/schema.ts
var polishResponseSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
    changes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string" },
          original: { type: "string" },
          replacement: { type: "string" },
          explanation: { type: "string" }
        },
        required: ["category", "original", "replacement", "explanation"],
        additionalProperties: false
      }
    }
  },
  required: ["text", "changes"],
  additionalProperties: false
};

// server.ts
import { randomUUID } from "node:crypto";

// api/guards.ts
import {
  Language as Language2,
  Tone as Tone2
} from "@ai-message-polisher/contracts";
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isLanguage(value) {
  return Object.values(Language2).some((language) => language === value);
}
function isTone(value) {
  return Object.values(Tone2).some((tone) => tone === value);
}
function isPolishChange(value) {
  return isRecord(value) && typeof value.category === "string" && typeof value.original === "string" && typeof value.replacement === "string" && typeof value.explanation === "string";
}
function isPolishResponse(value) {
  return isRecord(value) && typeof value.text === "string" && value.text.trim().length > 0 && Array.isArray(value.changes) && value.changes.every(isPolishChange);
}

// server.ts
import { URLSearchParams } from "node:url";
var gigachatModel = process.env.GIGACHAT_MODEL ?? "GigaChat";
var gigachatScope = process.env.GIGACHAT_SCOPE ?? "GIGACHAT_API_PERS";
var cachedAccessToken;
var tokenValidUntil = 0;
var app = express();
app.use(express.json({ limit: "32kb" }));
async function getGigaChatAccessToken() {
  if (cachedAccessToken && Date.now() < tokenValidUntil) {
    return cachedAccessToken;
  }
  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) {
    throw new Error("GIGACHAT_AUTH_KEY should be defined");
  }
  const response = await fetch(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${authKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        RqUID: randomUUID()
      },
      body: new URLSearchParams({ scope: gigachatScope }),
      signal: AbortSignal.timeout(15e3)
    }
  );
  if (!response.ok) {
    throw new Error(
      `GigaChat token request failed with HTTP ${response.status}`
    );
  }
  const data = await response.json();
  if (!isRecord(data) || typeof data.access_token !== "string" || typeof data.expires_at !== "number") {
    throw new Error("GigaChat returned an invalid token response");
  }
  cachedAccessToken = data.access_token;
  tokenValidUntil = data.expires_at;
  return cachedAccessToken;
}
app.post("/api/polish", async (req, res) => {
  const body = req.body;
  if (!isRecord(body)) {
    res.status(400).json({ error: "Request body must be an object." });
    return;
  }
  const { text, language, tone } = body;
  if (typeof text !== "string" || !text.trim() || text.length > 2e4) {
    res.status(400).json({ error: "Provide text of up to 20,000 characters." });
    return;
  }
  if (!isLanguage(language) || !isTone(tone)) {
    res.status(400).json({ error: "Unsupported language or tone." });
    return;
  }
  try {
    const accessToken = await getGigaChatAccessToken();
    const gigachatResponse = await fetch(
      `https://gigachat.devices.sberbank.ru/api/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: gigachatModel,
          stream: false,
          response_format: {
            type: "json_schema",
            schema: polishResponseSchema,
            strict: true
          },
          messages: [
            {
              role: "system",
              content: buildPolishInstructions(language, tone)
            },
            {
              role: "user",
              content: text
            }
          ]
        }),
        signal: AbortSignal.timeout(12e4)
      }
    );
    if (!gigachatResponse.ok) {
      throw new Error(
        `GigaChat completion request failed with HTTP ${gigachatResponse.status}`
      );
    }
    const result = await gigachatResponse.json();
    if (!isRecord(result) || !Array.isArray(result.choices) || !result.choices[0]) {
      res.status(502).json({ error: "The AI service returned an invalid response." });
      return;
    }
    const choice = result.choices[0];
    if (!isRecord(choice) || !isRecord(choice.message)) {
      res.status(502).json({ error: "The AI service returned an invalid response." });
      return;
    }
    const content = choice.message.content;
    if (typeof content !== "string" || !content.trim()) {
      res.status(502).json({ error: "The AI service returned no text." });
      return;
    }
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (error) {
      console.error("GigaChat returned invalid JSON:", error);
      res.status(502).json({ error: "The AI service returned invalid JSON." });
      return;
    }
    if (!isPolishResponse(parsedResponse)) {
      res.status(502).json({ error: "The AI service returned an invalid response." });
      return;
    }
    res.json({
      text: parsedResponse.text.trim(),
      changes: parsedResponse.changes
    });
  } catch (error) {
    console.error("GigaChat polish request failed:", error);
    if (!res.headersSent) {
      res.status(502).json({
        error: "Could not polish the text. Please try again."
      });
    }
  }
});
var port = Number(process.env.PORT ?? 3e3);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
