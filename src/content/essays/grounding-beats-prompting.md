---
title: 'Grounding beats prompting: turning support tickets into engineering specs with agents'
description: 'What an agentic ticket-to-spec workflow taught us: retrieval from a maintained knowledge base did more for accuracy than any prompt change.'
pubDate: 2026-10-12
pillar: ai-native-sdlc
tags: [agentic-workflows, mcp, responsible-ai, spec-driven-development]
draft: true
thesis: 'In enterprise agentic workflows, the knowledge base is the guardrail: grounding an agent in maintained documentation improves accuracy more than a better prompt does.'
tldr: 'We built an agentic workflow that turns a customer support ticket into an architecture-grounded engineering spec in about two minutes plus human review, down from 30–60 minutes of manual work. The biggest quality gain came from forcing the agent to retrieve from our own knowledge base, not from prompt tuning. Human approval stays in front of every write, and every correction is folded back into the workflow definition.'
faq:
  - q: 'What is a grounded agentic workflow?'
    a: 'A workflow where an AI agent must retrieve evidence from a maintained, authoritative knowledge base before it reasons or writes, so its output reflects your actual systems rather than general training knowledge.'
  - q: 'Is an agentic workflow the same as full autonomy?'
    a: 'No. The highest-value pattern here kept a human approval gate in front of every write to a production system, such as creating an issue in the tracker.'
  - q: 'How is this different from RPA?'
    a: 'RPA replays fixed selectors and breaks when a UI changes. The agent reads the page structure and reasons about where the data lives, so layout changes rarely break it.'
---

A grounded agentic workflow is one where an AI agent has to retrieve evidence from a maintained knowledge base before it reasons or writes.
This essay explains why that one constraint mattered more than anything else when we automated the path from support ticket to engineering spec.

## What problem were we solving?

Every enterprise support pipeline hits the same bottleneck.
A customer-facing ticket describes the *symptom*. Turning it into an actionable engineering spec means someone has to:

1. Read the ticket and its attachments.
2. Know which internal service or parser owns the issue.
3. Cross-reference architecture documentation to explain *why* it's happening.
4. Write a clean, correctly formatted issue for the engineering tracker.
5. Link everything back to the source ticket for traceability.

That's 30–60 minutes of tribal-knowledge work per ticket.
It usually lands on a senior engineer who happens to remember which repository owns an obscure configuration parameter.

## What did we build?

A versioned workflow, run from the IDE with one command and a ticket ID, that:

1. **Authenticates** to the internal ticketing system through SSO and keeps the session between runs.
2. **Reads the ticket** with browser automation, without hard-coded selectors.
3. **Retrieves from the domain knowledge base** to ground the analysis in the real architecture.
4. **Drafts a spec** with a root-cause hypothesis, repository links and component ownership.
5. **Stops for human approval** before anything is written to a production system.
6. **Creates the issue** through the tracker's API, linked back to the source ticket.

From reading the ticket to creating the issue now takes about two minutes, plus the human review in the middle.

## Which agentic concepts actually mattered?

### Tool-orchestrated perception, not scripted scraping

Instead of brittle CSS selectors, the agent used a browser-automation MCP server to snapshot the page's accessibility tree and reason about where the title, status, description and attachments were.
When a first extraction attempt came back blank, it fell back to pattern matching over the page text and corrected itself.

This is not RPA. RPA breaks the moment a UI changes; an agent that reads the page the way a person does is far cheaper to maintain.

### Retrieval-grounded reasoning

This was the most important lesson.
The agent's first root-cause analysis sounded plausible and was **wrong**. It described a target-state data platform that was still being built as if it were already in production.

A better prompt didn't fix it. What fixed it was making the agent:

- search the actual knowledge base (functional specs, technical specs, pod documentation) before analysing anything;
- quote real identifiers, such as exact repository paths, enum values and column names, rather than paraphrasing;
- label every architectural statement as **current production** or **target state**, because mixing the two sends engineers down the wrong path.

**The knowledge base is the guardrail against hallucination.**
In regulated or highly technical environments, agents have to be grounded in your own maintained documentation, not in general training knowledge.

### Self-correction through human feedback

A reviewer caught four problems in an early draft: an architecture inaccuracy, poor formatting, an invented repository reference, and a false claim that the attachments had been uploaded.
Each correction went back to the agent. It re-queried the knowledge base for the right repository, rewrote the output in the tracker's own markup, and added an honest note about what it could and couldn't do with attachments.

That's the difference between a one-shot LLM call and an agentic loop: human review is an input that triggers re-analysis, not a rubber stamp.

### Workflow-as-code with embedded guardrails

The workflow is a versioned Markdown file with explicit steps.
Read-only steps run automatically; the approval gate in front of the write is hard-coded.

After those corrections, we didn't just fix one output. **We amended the workflow definition** so every future run enforces:

- knowledge-base retrieval before analysis;
- an explicit current-versus-target architecture distinction;
- the tracker's native formatting;
- an honest statement of attachment handling.

Fixes should be institutionalised in the workflow, so the next ticket benefits automatically.

### Session persistence and tool composition

Persisting the SSO session for a day removed the login round trip from every run and made batch processing practical.
The agent composed three independent MCP servers (browser automation, the issue tracker and file-system retrieval) without any of them knowing about the others.
That is MCP's core bet: specialised tools, composed by a reasoning layer, instead of point-to-point integrations.

## What changed?

| Measure | Before | After |
|---|---|---|
| Ticket to engineering spec | 30–60 min, manual | ~2 min (agent) plus review |
| Architecture accuracy | Depended on one person's memory | Grounded in a maintained knowledge base |
| Traceability | Manual copy-paste, often incomplete | Automatic links in both directions |
| Consistency | Varied by author | Enforced by the workflow template |

## What should technical leaders take from this?

- **Agentic doesn't mean autonomous without oversight.** The value came from a human gate at the right point, before the write.
- **Grounding beats prompting.** Retrieval against real documentation did more for quality than any prompt change.
- **Treat workflows as living artefacts.** Corrections belong in the workflow definition, not just in one output.
- **MCP-style composition multiplies productivity.** Ticketing, source control and issue tracking connect without bespoke integration code.

For product managers, the point isn't replacing the engineers who triage tickets.
It's shrinking the gap between "a customer reported an issue" and "an engineer has a correctly scoped, architecture-grounded spec".
The bottleneck was never typing speed; it was retrieving tribal knowledge. A grounded agent can bring that knowledge to every ticket, with a human still holding the approval pen.
