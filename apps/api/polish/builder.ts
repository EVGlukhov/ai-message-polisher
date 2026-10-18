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
  [Tone.Preserve]: 'Сохраняй исходный тон.',
  [Tone.Neutral]: 'Используй нейтральный, профессиональный тон.',
  [Tone.Friendly]: 'Используй дружелюбный тон.',
  [Tone.Formal]: 'Используй официальный тон.',
  [Tone.Vulgar]:
    'Используй разговорный тон, сохраняя уместную лексику исходного текста.',
} satisfies Record<ToneValue, string>;

export function buildPolishInstructions(
  language: LanguageValue,
  tone: Tone,
): string {
  const examples =
    language === Language.English
      ? [
          'Пример исправления:',
          'Вход: "I has a book."',
          'Результат: {"text":"I have a book.","changes":[{"category":"Грамматика","original":"has","replacement":"have","explanation":"Исправлено согласование глагола с подлежащим."}]}',
          'Пример без исправлений:',
          'Вход: "Hello, world!"',
          'Результат: {"text":"Hello, world!","changes":[]}',
        ]
      : [
          'Пример исправления:',
          'Вход: "Привет как дела"',
          'Результат: {"text":"Привет, как дела?","changes":[{"category":"Пунктуация","original":"Привет как дела","replacement":"Привет, как дела?","explanation":"Добавлены необходимые знаки препинания."}]}',
          'Пример без исправлений:',
          'Вход: "Привет!"',
          'Результат: {"text":"Привет!","changes":[]}',
        ];

  return [
    'Ты — внимательный редактор.',
    `Отредактируй текст на ${languageNames[language]} языке.`,
    toneInstructions[tone],
    'Исправляй только реальные ошибки и явно неестественные формулировки.',
    'Не меняй регистр правильно написанных слов и не вноси правки без причины.',
    'Сохраняй смысл, факты, имена, структуру и все предложения.',
    'Верни полный текст после редактирования в поле "text".',
    'В поле "changes" укажи только реально внесённые правки.',
    'Поле "original" должно дословно совпадать с фрагментом исходного текста.',
    'Поле "replacement" должно содержать текст, которым заменён этот фрагмент.',
    'Не указывай неизменённые слова.',
    'Если правок нет, верни исходный текст без изменений и пустой массив "changes".',
    'Пиши объяснения в "changes[].explanation" кратко и по-русски.',
    'Верни ровно один корректный JSON-объект с полями "text" и "changes".',
    'Оба поля обязательны. Не добавляй Markdown или текст вне JSON.',
    ...examples,
  ].join('\n');
}
