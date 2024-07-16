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
AcmeCloud Outage Report - July 15, 2023

Incident Summary:
On July 15, 2023, AcmeCloud experienced a service disruption affecting multiple regions. The outage began at 14:30 UTC and was fully resolved by 18:45 UTC. This report details the cause, impact, and steps taken to prevent future occurrences.

Root Cause:
The outage was caused by a misconfigured load balancer update that was inadvertently pushed to production. This resulted in traffic being improperly routed, causing service unavailability for a significant number of users.

Timeline:
- 14:30 UTC: Initial reports of service degradation received
- 14:45 UTC: Engineering team identified the issue
- 15:30 UTC: Mitigation efforts began
- 18:15 UTC: Services restored for majority of users
- 18:45 UTC: Full service restoration confirmed

Impact:
The outage affected our primary cloud compute services, object storage, and database services across North America and Europe regions. Approximately 68% of our active users experienced either complete service unavailability or severe performance degradation during the incident.

Affected Services:
1. AcmeCloud Compute
2. AcmeCloud Storage
3. AcmeCloud Database
4. AcmeCloud Analytics (partial impact)

User Impact:
An estimated 1.2 million users were affected by the outage.

Financial Impact:
Based on average hourly revenue and service credits issued, the estimated revenue loss is approximately $2.8 million.

Mitigation and Prevention:
1. Rolled back the misconfigured load balancer update
2. Implemented additional safeguards in our deployment pipeline
3. Enhanced monitoring and alerting systems
4. Scheduled a comprehensive review of our change management processes

We sincerely apologize for any inconvenience caused and are committed to improving our systems to prevent similar incidents in the future.

For any questions or concerns, please contact our support team at support@acmecloud.com.

AcmeCloud Reliability Engineering Team`;

const userPromptData = `
Analyze this AcmeCloud outage report. Skip the preamble. Keep your response terse and write only the bare bones necessary information. List only:
1) Cause
2) Duration
3) Impacted services
4) Number of affected users
5) Estimated revenue loss.

Here’s the report: {{DATA}}`;

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
