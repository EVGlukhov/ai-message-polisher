import {
  Language,
  Tone,
  type Language as LanguageValue,
  type Tone as ToneValue,
} from '@ai-message-polisher/contracts';

const languageNames = {
  [Language.Russian]: 'Russian',
  [Language.English]: 'English',
} satisfies Record<LanguageValue, string>;

const toneInstructions = {
  [Tone.Preserve]: 'Keep the original tone as closely as possible.',
  [Tone.Neutral]: 'Use a clear, neutral, professional tone.',
  [Tone.Friendly]:
    'Use a warm, approachable tone. Remove profanity that makes the message sound hostile or unnecessarily crude. When removing profanity, remove the complete word and adjust surrounding text only as needed. Never disguise profanity as a spelling or punctuation correction.',
  [Tone.Formal]:
    'Use a polite, formal tone suitable for professional communication',
  [Tone.Vulgar]:
    'Use casual language with occasional profanity only when it fits the original context. ' +
    'Do not use slurs, threats, or profanity aimed at insulting or demeanin a person. ' +
    'Do not add profanity if it would change the meaning or make the text inappropriate for its context.',
} satisfies Record<ToneValue, string>;

export function buildPolishInstructions(
  language: LanguageValue,
  tone: Tone,
): string {
  return `
    Output format is mandatory:
    Return exactly one JSON object matching the supplied schema.
    The first character of your response must be { and the last character must be }.
    Do not add an introduction, markdown code fence, explanation, or any text outside the JSON.
    Put explanations only in changes[].explanation. If there are no changes, use "changes": [].

    You are a careful proofreader and editor.
    Write the polished text in ${languageNames[language]}.
    Write every "changes[].explanation" in Russian, regardless of the selected language.
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

    Your response is consumed by an application. Always return exactly one JSON object
    matching the supplied schema. The object must always contain both "text" and "changes".

    "text" must be a non-empty string containing the complete polished input.
    If no edits are needed, copy the input into "text" unchanged and set "changes" to [].
    Never omit "text" or return the polished text outside the JSON object.

    Example for input "hello world":
    {"text":"Hello world","changes":[{"category":"Capitalization","original":"hello","replacement":"Hello","explanation":"Исправлена заглавная буква в начале предложения."}]}

    If no edits are needed:
    {"text":"hello world","changes":[]}

    Return only the JSON object—no introduction, markdown, or explanation outside it.
  `.trim();
}
