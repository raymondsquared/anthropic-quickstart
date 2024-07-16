// Be clear, direct, and detailed
// When interacting with Claude, think of it as a brilliant but very new employee (with amnesia) who needs explicit instructions. Like any new employee, Claude does not have context on your norms, styles, guidelines, or preferred ways of working. The more precisely you explain what you want, the better Claude’s response will be.
// See {@link https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct#example-anonymizing-customer-feedback}

import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_MAX_TOKEN,
  DEFAULT_TEMPERATURE,
} from '../utils/constants';

import { AnthropicClientSingletonService } from '../client/anthropic';

const llmClientService = AnthropicClientSingletonService.getSingletonService();

const systemPrompt = '';

const userPromptTemplate = `
Your task is to anonymize customer feedback for our quarterly review.

Instructions:
1. Replace all customer names with “CUSTOMER_[ID]” (e.g., “Jane Doe” → “CUSTOMER_001”).
2. Replace email addresses with “EMAIL_[ID]@example.com”.
3. Redact phone numbers as “PHONE_[ID]“.
4. If a message mentions a specific product (e.g., “AcmeCloud”), leave it intact.
5. If no PII is found, copy the message verbatim.
6. Output only the processed messages, separated by ”---“.

Data to process: {{DATA}}`;

const userPromptData = `
1. Jane Doe (jane.doe@email.com) - I love the new features in AcmeCloud! It's made my work so much easier. Please call me at 555-123-4567 if you need any more feedback.
2. The customer support team was very helpful. John Smith assisted me and resolved my issue quickly. - Mike Johnson
3. AcmeCloud crashed on me twice this week. This is unacceptable for a paid service. Fix it ASAP! - angry_user@hotmail.com
4. I've been using your product for 3 months now and I'm impressed with the continual improvements. Keep up the good work!
5. Sarah Brown from marketing suggested I try AcmeCloud. It's okay, but I think it's overpriced compared to competitors. My number is (987) 654-3210 if you want to discuss further.
`;

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
