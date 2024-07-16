// Use examples (multishot prompting) to guide Claude's behavior
// Examples are your secret weapon shortcut for getting Claude to generate exactly what you need. 
// By providing a few well-crafted examples in your prompt, you can dramatically improve the accuracy, consistency, and quality of Claude’s outputs. 
// This technique, known as few-shot or multishot prompting, is particularly effective for tasks that require structured outputs or adherence to specific formats.
// 
// See {@link https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting}

import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_MAX_TOKEN,
  DEFAULT_TEMPERATURE,
} from '../utils/constants';

import { AnthropicClientSingletonService } from '../client/anthropic';

const llmClientService = AnthropicClientSingletonService.getSingletonService();

const systemPrompt = '';

const userPromptTemplate = `
Our CS team is overwhelmed with unstructured feedback. Your task is to analyze feedback and categorize issues for our product and engineering teams. Use these categories: UI/UX, Performance, Feature Request, Integration, Pricing, and Other. Also rate the sentiment (Positive/Neutral/Negative) and priority (High/Medium/Low). Here is an example:

<example>
Input: The new dashboard is a mess! It takes forever to load, and I can’t find the export button. Fix this ASAP!
Category: UI/UX, Performance
Sentiment: Negative
Priority: High</example>

Now, analyze this feedback: {{DATA}}`;

const userPromptData = `
I've been using your software for about a month now, and while I appreciate the robust feature set, I'm finding the learning curve quite steep. The UI is cluttered and not intuitive, especially when trying to set up new projects. It would be great if you could simplify the interface or provide better onboarding tutorials. On the plus side, the performance is excellent, and I love how quickly it processes large datasets. One feature I'd really like to see is the ability to export reports in PDF format. Also, the pricing seems a bit high compared to some of your competitors, especially for small teams like ours. Overall, it's a powerful tool, but there's definitely room for improvement in terms of user experience.
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
