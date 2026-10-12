---
title: 'Verify citations in code, not in the model'
description: 'Decision record for an internal knowledge assistant: grounded-only answers, code-checked citations, and a glossary that outranks every other source.'
pubDate: 2026-10-12
pillar: platform-architecture
tags: [agentic-workflows, responsible-ai, architecture-governance]
draft: true
status: proposed
decisions:
  - 'Answer only from retrieved excerpts; "not found in the knowledge base" is a valid answer'
  - 'Verify every citation in code and remove any that do not point to a retrieved source'
  - 'Rank sources by authority tier; the glossary overrides conflicting definitions elsewhere'
  - 'Use hybrid retrieval (vector plus keyword) because exact identifiers matter'
  - 'Keep routing, filtering and rule checks in code; use the LLM only to grade, write and assess'
tradeoffs:
  - 'More "insufficient evidence" answers in exchange for no unsupported claims'
  - 'Heading-aware chunking with line ranges adds indexing work but makes exact citations possible'
  - 'A local index first limits sharing, but proves answer quality before platform investment'
tldr: 'For a knowledge assistant over engineering documentation, we decided the model may only answer from retrieved excerpts and that code, not the model, checks every citation before an answer is returned. A glossary sits at the top of a source-authority ranking and is enforced on every output.'
faq:
  - q: 'Why not let the model check its own citations?'
    a: 'Because self-verification inherits the same failure it is meant to catch. A code check that every citation maps to a chunk in the retrieved set is cheap, deterministic and cannot be talked out of its answer.'
  - q: 'Why hybrid search instead of pure vector search?'
    a: 'Engineering documentation is full of exact identifiers (table names, job names, project keys). Vectors capture meaning; keyword scoring catches the exact strings. Reciprocal rank fusion combines both.'
---

A code-verified citation is one where deterministic code confirms that the cited file and line range came from the evidence actually retrieved for that answer, before the answer is shown.
This record captures why we made that, and a few related choices, non-negotiable for an internal engineering knowledge assistant.

## Context

Knowledge about several engineering teams' systems was spread across well over a hundred Markdown files, plus a cross-team knowledge-transfer document, a team registry and a glossary.
Answering a cross-team question, or checking that a spec cited the right owning team, meant reading several files by hand. It was slow, it depended on who was asking, and it was easy to get wrong.

While grounding the design we also found that **some documents disagreed with the glossary** about what core acronyms stand for. Any assistant built over that corpus would repeat the conflict unless something outranked it.

## Decision

Build a small LangGraph assistant with two graphs, question answering and spec validation, sharing one retrieval service and one guardrail layer.

1. **Grounded only.** The model answers only from retrieved excerpts. If evidence is thin, it widens the search once; if it's still thin, it says so and lists the closest sources.
2. **Citations are checked by code.** Each chunk carries file path, line range and heading path. After generation, a verifier removes any citation outside the retrieved set and flags claims with no citation. One regeneration is allowed.
3. **Authority tiers.** Glossary and registry outrank the knowledge-transfer document, which outranks team-level detail. A glossary lint rewrites wrong expansions in answers and flags the conflicting source.
4. **Hybrid retrieval.** Vector similarity plus keyword scoring, merged with reciprocal rank fusion, filtered by team and boosted by tier.
5. **Deterministic where possible.** Routing, filtering, citation checks and spec rule checks are plain code. The LLM grades relevance, writes the answer and assesses alignment.
6. **Reproducible.** Each index build gets a corpus version (a hash of file hashes). Every answer records the corpus version and a trace ID.

Spec validation runs the same retrieval to check ownership, citations, cross-team dependencies, project keys and terminology, and returns PASS, MARGINAL or FAIL. It is **advisory** until its verdicts are shown to agree with architect review.

## Consequences

- Citation accuracy and terminology compliance become properties enforced by code, not targets to hope for. Faithfulness is still measured, against a golden question set rerun on every corpus or model change.
- The assistant will sometimes say "not found". That's the intended behaviour.
- Fixing conflicting source documents is still worth doing; answer-time override is a safety net, not a substitute.
- The design runs on a laptop with an in-process index first, then moves onto a hosted retrieval platform without changing the graphs.
