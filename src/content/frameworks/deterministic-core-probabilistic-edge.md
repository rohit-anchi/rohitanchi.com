---
title: 'Deterministic core, probabilistic edge: a blueprint for AI intelligence gateways'
description: 'A reusable playbook for building read-only AI gateways over enterprise data: what belongs in code, what belongs in the LLM, and the gates between.'
pubDate: 2026-10-12
pillar: platform-architecture
tags: [agentic-workflows, mcp, operational-intelligence, architecture-governance]
draft: true
version: '1.0'
useWhen: 'You are putting a natural-language or agent interface over operational data, and answers must be reproducible, auditable and cheap to run.'
steps:
  - 'Intake: answer the stakeholder questionnaire before designing anything'
  - 'Classify every capability as deterministic or probabilistic'
  - 'Scaffold the structured CLI and prove it works with the LLM switched off'
  - 'Build one capability end to end: service, tool, MCP exposure'
  - 'Add the agent layer, then autonomy, behind explicit gates'
  - 'Verify against the checklist and ship read-only'
tldr: 'An AI intelligence gateway should compute every fact in deterministic, reproducible code and use the LLM only to interpret questions, choose tools and narrate results. Define each capability once and expose it to the CLI, the agent and MCP from the same registry. Gate the build in stages, and prove the gateway works with the LLM switched off before adding AI.'
faq:
  - q: 'What is an AI intelligence gateway?'
    a: 'A read-only layer that unifies access to a domain’s data stores and services behind structured commands and a natural-language interface, with the same capabilities exposed to other agents over MCP.'
  - q: 'What belongs in the LLM and what belongs in code?'
    a: 'If two runs with identical inputs must return identical outputs, it belongs in code. The LLM interprets the question, picks tools, and writes a summary grounded in tool results.'
  - q: 'Why expose tools over MCP as well as through the agent?'
    a: 'So external agents and the local CLI share one gateway. MCP is transport only; the tool body calls the same service function, so no business logic is duplicated.'
---

An AI intelligence gateway is a read-only layer that puts structured commands, a natural-language interface and MCP tools in front of a domain's operational data.
The design rule that makes one trustworthy is simple: **a deterministic core, with the LLM working only at the edges.**

## The rule of thumb

> If two runs with identical inputs must return identical outputs, it belongs in a deterministic tool, never inside the LLM.

| Deterministic (code) | Probabilistic (LLM) |
|---|---|
| Queries, aggregations, counts, status rules | Interpreting a natural-language question |
| Threshold alerts and ageing buckets | Choosing which tools to call, with what parameters |
| API calls and token exchange | Resolving ambiguous references |
| Finding de-duplication and persistence | Planning and evaluating multi-step investigations |
| Security verdicts (a rule over a scanner result) | Writing a summary grounded in tool output |

Status, counts and classifications are never computed by a model.

## Five layers

1. **Interface.** Structured commands for experts; anything unrecognised falls through to natural language.
2. **Agent layer.** Acts as the backend-for-frontend: decides which deterministic tools to call, stitches results and narrates. The same layer fronts MCP clients, so people and external agents share one gateway.
3. **Service layer.** Read-only business logic, cached.
4. **Data access.** Clients, schemas and typed models.
5. **Integrations.** Data stores, REST APIs, event streams and the approved LLM gateway.

## One capability, defined once

Give every capability a stable ID (for example `<domain>.<resource>.<scope>`) and register it in **one** place.
That registry drives the CLI command, the REST route, the agent tool, the MCP tool, the policy, the output contract, the audit record and the metrics label.

Duplicating logic between an agent tool and an MCP handler is the most common way these systems drift. Keep one service and two transports.

## Three execution tiers

- **Tier 0:** a structured command. No LLM involved.
- **Tier 1:** natural language mapped to a single capability.
- **Tier 2:** a multi-step investigation (plan, execute, evaluate) built only from existing capabilities, with a hard iteration cap.

Every answer, at every tier, should be replayable as the equivalent structured command, with the request time and the policy, contract and query versions pinned.

## Token discipline by construction

- Cache with a TTL that matches how stale each metric is allowed to be.
- Use aggregations for counts instead of fetching documents.
- Project only the fields the agent needs, and cap result sizes.
- Convert timestamps and roll up data **before** the model sees it.
- Hand the model compact summaries, never raw search hits.

A clear domain-knowledge block and data catalogue help the agent pick the right tool first time, which avoids exploratory tool loops that burn tokens.

## Build in gated stages

| Gate | Before you… | Pass condition |
|---|---|---|
| Intake complete | design | Every stakeholder question answered: terminology, entities, top questions, data stores, auth, health thresholds, security, token budget |
| Determinism signed off | build | Every capability classified as deterministic or probabilistic |
| Degradation proven | add AI | Structured commands work with the LLM disabled |
| Token discipline | expose to users | No raw documents in prompts; cache hits confirmed |
| Security | merge | SAST, dependency and infrastructure scans clean at High/Critical |
| Read-only | ship | No write calls; any auto-write flag defaults to off |

Don't ask an agentic coding harness to "build the whole thing" in one go. Hand it the blueprint and drive it one stage at a time, stopping at each gate.

## Grounding and governance

- **Ground everything** in a single domain-knowledge block (terminology, entity lifecycle, data catalogue, which external system is authoritative for what) plus a registry of each integration's failure signatures and ownership boundaries.
- **Rank sources by authority.** When documents disagree, for example on what an acronym stands for, the glossary wins and a lint step checks every generated summary against it.
- **Keep autonomy advisory.** Findings from autonomous scans are recommendations; any write, such as raising a ticket, sits behind an explicit flag that defaults to off.
- **Secrets live in the environment or a vault**, never in source or logs.

## Pitfalls

| Pitfall | Fix |
|---|---|
| Business logic inside the LLM | Move it into a deterministic service |
| Fetching full documents to count them | Aggregate instead |
| The same logic in the agent tool and the MCP handler | One service, two transports |
| Startup blocked on network calls | Lazy or background initialisation |
| Building AI before the deterministic core works | Ship one capability end to end first, then repeat |
