export const Language = {
  Russian: 'ru',
  English: 'en',
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export const Tone = {
  Preserve: 'preserve',
  Neutral: 'neutral',
  Friendly: 'friendly',
  Formal: 'formal',
  Vulgar: 'vulgar',
} as const;

export type Tone = (typeof Tone)[keyof typeof Tone];

export type PolishSettings = {
  language: Language;
  tone: Tone;
};

export type PolishRequest = PolishSettings & {
  text: string;
};

export type PolishChange = {
  category: string;
  original: string;
  replacement: string;
  explanation: string;
};

export type PolishResponse = {
  text: string;
  changes: PolishChange[];
};
