export const polishResponseSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    changes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          original: { type: 'string' },
          replacement: { type: 'string' },
          explanation: { type: 'string' },
        },
        required: ['category', 'original', 'replacement', 'explanation'],
        additionalProperties: false,
      },
    },
  },
  required: ['text', 'changes'],
  additionalProperties: false,
} as const;
