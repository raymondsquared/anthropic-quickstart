import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_MAX_TOKEN,
  DEFAULT_TEMPERATURE,
} from './utils/constants';
import { AnthropicClientSingletonService } from './client';

const llmClientService = AnthropicClientSingletonService.getSingletonService();

const systemPrompt = 'Respond only with short poems.';
const userPrompt = 'Why is the ocean salty?';

const llmClientServiceOutput = await llmClientService.post({
  model: DEFAULT_ANTHROPIC_MODEL,
  maxToken: DEFAULT_MAX_TOKEN,
  temperature: DEFAULT_TEMPERATURE,
  systemPrompt,
  body: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          template: null,
          data: userPrompt,
        },
      ],
    },
  ],
});
console.log(llmClientServiceOutput);
