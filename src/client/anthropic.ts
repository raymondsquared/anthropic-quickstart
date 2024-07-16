import Anthropic from '@anthropic-ai/sdk';
import Handlebars from 'handlebars';

import {
  LLMClientService,
  LLMInput,
  LLMOutput,
  LLMClient,
  AnthropicMessageContent,
} from './client';

class AnthropicClientSingletonService implements LLMClientService {
  private static instance: LLMClientService | null = null;
  private client: LLMClient;

  private constructor() {
    this.client = new Anthropic();
  }

  public static getSingletonService(): LLMClientService {
    if (!this.instance) {
      this.instance = new AnthropicClientSingletonService();
    }
    return this.instance;
  }

  async post(input: LLMInput): Promise<LLMOutput | null> {
    const messages: Anthropic.MessageParam[] = [];
    for (const bodyItem of input?.body) {
      let messageContent: AnthropicMessageContent = [];
      for (const bodyItemContent of bodyItem?.content) {
        let text = bodyItemContent.data;
        if (bodyItemContent.template) {
          text = Handlebars.compile(bodyItemContent.template)({
            DATA: bodyItemContent.data,
          });
        }
        const content: Anthropic.TextBlockParam = {
          type: 'text',
          text,
        };
        messageContent.push(content);
      }

      const message: Anthropic.MessageParam = {
        role: bodyItem.role,
        content: messageContent,
      };
      messages.push(message);
    }

    const anthropicClientInput: Anthropic.MessageCreateParamsNonStreaming = {
      model: input.model,
      max_tokens: input.maxToken,
      temperature: input.temperature,
      system: input.systemPrompt?.toString(),
      messages,
    };
    const anthropicClientOutput = await this.client.messages.create(
      anthropicClientInput,
    );

    if (anthropicClientOutput) {
      return {
        id: anthropicClientOutput.id,
        type: anthropicClientOutput.type,
        role: anthropicClientOutput.role,
        model: anthropicClientOutput.model,
        content: anthropicClientOutput.content,
        stopReason: anthropicClientOutput.stop_reason,
        stopSequence: anthropicClientOutput.stop_sequence,
        usage: anthropicClientOutput.usage,
      } as LLMOutput;
    }

    return null;
  }
}

export { AnthropicClientSingletonService };
