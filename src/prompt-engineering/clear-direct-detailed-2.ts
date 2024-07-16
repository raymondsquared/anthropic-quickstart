// Be clear, direct, and detailed
// When interacting with Claude, think of it as a brilliant but very new employee (with amnesia) who needs explicit instructions. 
// Like any new employee, Claude does not have context on your norms, styles, guidelines, or preferred ways of working. 
// The more precisely you explain what you want, the better Claude’s response will be.
// 
// See {@link https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct}

import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_MAX_TOKEN,
  DEFAULT_TEMPERATURE,
} from '../utils/constants';

import { AnthropicClientSingletonService } from '../client/anthropic';

const llmClientService = AnthropicClientSingletonService.getSingletonService();

const systemPrompt = '';

const userPromptTemplate = '';

const userPromptData = `
Your task is to craft a targeted marketing email for our Q3 AcmeCloud feature release.

Instructions:
1. Write for this target audience: Mid-size tech companies (100-500 employees) upgrading from on-prem to cloud.
2. Highlight 3 key new features: advanced data encryption, cross-platform sync, and real-time collaboration.
3. Tone: Professional yet approachable. Emphasize security, efficiency, and teamwork.
4. Include a clear CTA: Free 30-day trial with priority onboarding.
5. Subject line: Under 50 chars, mention “security” and “collaboration”.
6. Personalization: Use {{COMPANY_NAME}} and {{CONTACT_NAME}} variables.

Structure:
1. Subject line
2. Email body (150-200 words)
3. CTA button text`;

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
          template: userPromptTemplate,
          data: userPromptData,
        },
      ],
    },
  ],
});
console.log(llmClientServiceOutput);
