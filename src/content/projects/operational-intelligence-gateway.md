---
title: 'Operational intelligence gateway for an enterprise telemetry platform'
description: 'A read-only CLI and MCP gateway for operational questions about clients, collectors and assets: deterministic answers, agents at the edges.'
pubDate: 2026-10-12
pillar: enterprise-telemetry
tags: [operational-intelligence, mcp, agentic-workflows, observability]
draft: true
status: active
problem: 'Answering everyday operational questions about a telemetry platform (is this client collecting, through which channel, which assets are stale) meant querying several systems by hand or waiting on an engineer.'
impact:
  - 'One entry point for SRE, support, architecture and billing-operations questions'
  - 'Every answer replayable as a structured command with pinned policy and query versions'
  - 'Same capabilities available to people in a CLI and to other agents over MCP'
stack: ['Python', 'LangGraph', 'LangChain', 'MCP', 'Kubernetes', 'OpenAI-compatible LLM gateway']
---

An operational intelligence gateway is a read-only layer that lets people and agents ask questions of a platform's operational data, through structured commands or natural language, and get answers they can trust.

## The problem

Telemetry-collection platforms accumulate a lot of operational state: which customers are configured, which collectors are reporting, through which channel, and which assets have gone quiet.
Answering "is this client still collecting?" meant checking several tables and applying status rules that lived in people's heads.

## Approach

- **Deterministic core.** Status, counts and channel resolution are computed by versioned policies in code. Each of the three status rules (per client, per channel, per asset) is a named, versioned policy rather than a hard-coded threshold.
- **Agents at the edges.** LLMs translate natural language into a canonical command, disambiguate references, combine capabilities into multi-step investigations, and write summaries grounded in the results. Nothing else.
- **One capability registry.** Each capability ID drives the CLI command, REST route, MCP tool, LangGraph subgraph, policy, output contract, audit record and metrics label.
- **Replayable answers.** Every response can be re-run as the equivalent structured command, with request time and versions pinned.
- **Grounding gate before build.** Checking the use-case backlog against the platform knowledge base surfaced data and definition mismatches (undocumented tables, incomplete channel definitions, a join that would silently drop unclassified clients). They had to be resolved before output contracts were frozen.
- **Production-grade MCP.** MCP servers are hosted centrally against a read replica, with OAuth and short-lived database credentials, instead of local containers with direct database access.

## Status

In design and phased build. The pattern behind it is written up as a reusable framework: [Deterministic core, probabilistic edge](/frameworks/deterministic-core-probabilistic-edge/).
