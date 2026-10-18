export declare const Language: {
  readonly Russian: 'ru';
  readonly English: 'en';
};
export type Language = (typeof Language)[keyof typeof Language];
export declare const Tone: {
  readonly Preserve: 'preserve';
  readonly Neutral: 'neutral';
  readonly Friendly: 'friendly';
  readonly Formal: 'formal';
  readonly Vulgar: 'vulgar';
};
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
