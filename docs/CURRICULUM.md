# Canonical curriculum — 8 weeks · 8 modules · 40 lessons

**Learning path:** Phases → Modules → Lessons → Practical labs → Checkpoints.
**Expected pace:** 30–45 minutes per day, five days per week. Adjust for mastery.
**Legend:** Lesson 1.1 is fully drafted in `content/lessons/1-1.md`; the others are planned outlines pending expansion.

## Module 1 — Anatomy of Effective Prompts (Week 1)
**Objective:** Specify goals, context, constraints, success, and verification.

### 1.1 How language models interpret prompts
- **Target:** Distinguish intent, information and assumptions.
- **Lab:** Rewrite a vague Ubuntu maintenance prompt with safe boundaries.
- **Publication status:** Published

### 1.2 Goals, instructions and context
- **Target:** Separate the objective from supporting inputs.
- **Lab:** Make a file-organizer specification.
- **Publication status:** Outline only

### 1.3 Constraints and boundaries
- **Target:** Specify rules without overconstraining.
- **Lab:** Limit an AI code review to one directory.
- **Publication status:** Outline only

### 1.4 Output contracts and acceptance criteria
- **Target:** Make expected results observable.
- **Lab:** Define JSON response and tests for a bug report.
- **Publication status:** Outline only

### 1.5 Reusable prompt templates
- **Target:** Create modular templates with placeholders.
- **Lab:** Build a diagnostic prompt template.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 2 — Prompting Techniques (Week 2)
**Objective:** Use examples, grounding, and decomposition selectively.

### 2.1 Zero-shot and few-shot prompting
- **Target:** Choose appropriate examples and avoid pattern leakage.
- **Lab:** Compare prompts on the same extraction task.
- **Publication status:** Outline only

### 2.2 Delimiters and instruction hierarchy
- **Target:** Separate untrusted input from instructions.
- **Lab:** Wrap source documents in delimiters.
- **Publication status:** Outline only

### 2.3 Grounding and source-based answers
- **Target:** Require evidence and uncertainty notes.
- **Lab:** Create a grounded document summary.
- **Publication status:** Outline only

### 2.4 Task decomposition and prompt chaining
- **Target:** Break complex tasks into checkable substeps.
- **Lab:** Design a two-pass code review.
- **Publication status:** Outline only

### 2.5 Prompt iteration and debugging
- **Target:** Use failure cases to improve prompts.
- **Lab:** Maintain before/after prompt experiments.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 3 — Context Engineering (Week 3)
**Objective:** Select and maintain useful context under budget.

### 3.1 Context windows and token budgets
- **Target:** Understand tradeoffs between relevance and quantity.
- **Lab:** Trim irrelevant project logs.
- **Publication status:** Outline only

### 3.2 Context relevance and retrieval
- **Target:** Rank files by task relevance.
- **Lab:** Create a codebase context manifest.
- **Publication status:** Outline only

### 3.3 Persistent project instructions
- **Target:** Use AGENTS.md for stable conventions.
- **Lab:** Write an AGENTS.md for a sample app.
- **Publication status:** Outline only

### 3.4 Source of truth and compaction
- **Target:** Summarize without losing critical decisions.
- **Lab:** Create a durable handoff note.
- **Publication status:** Outline only

### 3.5 Context conflicts and staleness
- **Target:** Resolve competing and outdated directions.
- **Lab:** Audit contradictory instructions.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 4 — Specification-Driven Coding (Week 4)
**Objective:** Direct coding agents with tested requirements.

### 4.1 Implementation specifications
- **Target:** Translate requests into technical specs.
- **Lab:** Specify a CSV cleaner.
- **Publication status:** Outline only

### 4.2 Acceptance criteria and invariants
- **Target:** Protect conditions that must stay true.
- **Lab:** Define data preservation invariants.
- **Publication status:** Outline only

### 4.3 Planning before coding
- **Target:** Choose minimal implementation strategy.
- **Lab:** Review an agent's dependency plan.
- **Publication status:** Outline only

### 4.4 Minimal diffs and regression testing
- **Target:** Limit change surface and defend behavior.
- **Lab:** Patch a failing function and test it.
- **Publication status:** Outline only

### 4.5 Code verification and review
- **Target:** Require evidence, not self-reported success.
- **Lab:** Audit code and test output.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 5 — Reliable Agent Foundations (Week 5)
**Objective:** Understand tools, autonomy, and recovery.

### 5.1 Agent architecture and loops
- **Target:** Model action–observation–decision cycles.
- **Lab:** Map a file-inspection agent loop.
- **Publication status:** Outline only

### 5.2 Tool calls and schemas
- **Target:** Define safe inputs and outputs.
- **Lab:** Write a mock tool contract.
- **Publication status:** Outline only

### 5.3 Model Context Protocol (MCP)
- **Target:** Understand tool/resource/prompt connections.
- **Lab:** Plan an MCP-backed documentation lookup.
- **Publication status:** Outline only

### 5.4 Bounded autonomy and permissions
- **Target:** Identify approval gates and least privilege.
- **Lab:** Design an access-policy matrix.
- **Publication status:** Outline only

### 5.5 Error handling and recovery
- **Target:** Handle failed tools, retries, and blockers.
- **Lab:** Write a retry-and-stop policy.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 6 — Agent Workflow Orchestration (Week 6)
**Objective:** Choose appropriate single- and multi-agent patterns.

### 6.1 Sequential workflows
- **Target:** Chain tasks with validated handoffs.
- **Lab:** Design a plan–implement–test loop.
- **Publication status:** Outline only

### 6.2 Routing and delegation
- **Target:** Select specialized workflows based on input.
- **Lab:** Route bug versus feature requests.
- **Publication status:** Outline only

### 6.3 Parallel execution
- **Target:** Parallelize independent work safely.
- **Lab:** Identify tasks safe to run simultaneously.
- **Publication status:** Outline only

### 6.4 Multi-agent orchestration
- **Target:** Evaluate benefit versus coordination overhead.
- **Lab:** Compare a single-agent and multi-agent design.
- **Publication status:** Outline only

### 6.5 Handoffs and state management
- **Target:** Preserve state and provenance across steps.
- **Lab:** Write a structured handoff summary.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 7 — Reliability, Evaluation and Safety (Week 7)
**Objective:** Measure quality and contain risk.

### 7.1 Evaluation-driven development
- **Target:** Define repeatable success measures.
- **Lab:** Create a small test set.
- **Publication status:** Outline only

### 7.2 Golden datasets and harnesses
- **Target:** Build trusted expected outputs.
- **Lab:** Design a prompt evaluation fixture.
- **Publication status:** Outline only

### 7.3 Traces and observability
- **Target:** Read logs of tool use and decisions.
- **Lab:** Inspect a fictional failure trace.
- **Publication status:** Outline only

### 7.4 Prompt injection and trust boundaries
- **Target:** Separate adversarial data from authority.
- **Lab:** Threat-model a retrieved README.
- **Publication status:** Outline only

### 7.5 Rollback, recovery and approval gates
- **Target:** Protect destructive operations.
- **Lab:** Write a safe rollout plan.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.

## Module 8 — Capstone: Agentic Developer (Week 8)
**Objective:** Integrate engineering practices into a useful coding workflow.

### 8.1 End-to-end agent specification
- **Target:** Define user story, limits and done conditions.
- **Lab:** Write capstone proposal.
- **Publication status:** Outline only

### 8.2 Tool and context architecture
- **Target:** Choose tools, source of truth and permissions.
- **Lab:** Create architecture diagram.
- **Publication status:** Outline only

### 8.3 Agent implementation
- **Target:** Build a scoped coding agent workflow.
- **Lab:** Implement a testable agent pipeline.
- **Publication status:** Outline only

### 8.4 Evaluation and failure correction
- **Target:** Run representative test cases.
- **Lab:** Record and address failures.
- **Publication status:** Outline only

### 8.5 Demonstration and engineering review
- **Target:** Present evidence and tradeoffs.
- **Lab:** Produce final evaluation report.
- **Publication status:** Outline only

**Module checkpoint:** Explain the main concepts without relying on jargon; complete a working lab and provide verification evidence.


## Completion policy
- Only a published lesson with practical activity and checkpoint should be marked complete.
- An outline communicates the future topic; it is not an instructional article.
- Keep lesson IDs stable to avoid breaking bookmarks/progress.
