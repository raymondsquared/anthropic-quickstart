import Anthropic from '@anthropic-ai/sdk';

type AnthropicType = 'text';
type AnthropicModel = 'claude-3-5-sonnet-20240620' | 'claude-3-opus-20240229';
type AnthropicRole = 'user' | 'assistant';
type AnthropicMessageContent =
  | string
  | Array<
      | Anthropic.TextBlockParam
      | Anthropic.ImageBlockParam
      | Anthropic.ToolUseBlockParam
      | Anthropic.ToolResultBlockParam
    >;

interface AnthropicInputBodyData {
  type: LLMType;
  template: string | null;
  data: string;
}

interface AnthropicInputBody {
  role: LLMRole;
  content: AnthropicInputBodyData[];
}

interface AnthropicInput {
  model: LLMModel;
  maxToken: number;
  temperature: number;
  systemPrompt: string;
  body: AnthropicInputBody[];
}

interface AnthropicOutput {
  id: string;
  type: string;
  role: LLMRole;
  model: LLMModel;
  content: Anthropic.TextBlock[];
  stopReason: string | null;
  stopSequence: string | null;
  usage: Anthropic.Usage;
}

type LLMType = AnthropicType;
type LLMModel = AnthropicModel;
type LLMRole = AnthropicRole;
type LLMInput = AnthropicInput;
type LLMOutput = AnthropicOutput;
type LLMClient = Anthropic;

interface LLMClientService {
  post(input: LLMInput): Promise<LLMOutput | null>;
}

export {
  AnthropicModel,
  AnthropicRole,
  AnthropicMessageContent,
  AnthropicInputBodyData,
  AnthropicInputBody,
  AnthropicInput,
  AnthropicOutput,
  LLMModel,
  LLMRole,
  LLMInput,
  LLMOutput,
  LLMClient,
  LLMClientService,
};
