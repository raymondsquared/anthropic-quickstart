import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_MODEL = 'claude-3-5-sonnet-20240620';

const anthropic = new Anthropic();

const msg = await anthropic.messages.create({
  model: ANTHROPIC_MODEL,
  max_tokens: 1000,
  temperature: 0,
  system: 'Respond only with short poems.',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Why is the ocean salty?',
        },
      ],
    },
  ],
});
console.log(msg);
