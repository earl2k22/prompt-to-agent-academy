# Development roadmap

**Project:** Prompt to Agent Academy
**Status owner:** docs/STATUS.md
**Approach:** milestone-based, testable, GitHub-first. Update status after every change.

## Goals and non-goals
- Build an approachable, responsive learning platform from basic prompting to safe agentic software engineering.
- Store content and project decisions in GitHub, independent of any chat session or workstation.
- Support read-only browsing and later safe editing of content, with reviewable history.
- Version 1 is NOT a cloud coding sandbox, multi-user LMS, or autonomous agent with shell access.

## Stages

### Stage 0 — Foundation and repository governance
**Deliverables:** README, AGENTS.md, architecture, roadmap, curriculum, prompts, first lesson

**Exit criterion:** A future session can reconstruct goals, state, and next work from GitHub.

**Status at kickoff:** Done

### Stage 1 — Website MVP and GitHub Pages
**Deliverables:** Vite + React + TypeScript + Tailwind shell, responsive layout, navigation, deployment workflow

**Exit criterion:** Site builds and renders the dashboard, roadmap and lesson outline without broken navigation.

**Status at kickoff:** In progress

### Stage 2 — Learning content publishing
**Deliverables:** Expand 40 outlines into complete teaching content with examples, labs and checkpoint questions

**Exit criterion:** Each published lesson meets the content quality checklist; no outline is marked complete prematurely.

**Status at kickoff:** Planned

### Stage 3 — Jargon reference and search
**Deliverables:** Glossary of precise engineering terminology and example prompts

**Exit criterion:** Search and categories work; every term has a definition and application.

**Status at kickoff:** In progress

### Stage 4 — Interactive labs and assessments
**Deliverables:** Runnable exercises where feasible, hints, rubric, answer/feedback mechanisms

**Exit criterion:** Question and result states are explicit; incomplete exercises cannot be counted complete.

**Status at kickoff:** Planned

### Stage 5 — Durable progress and bookmarks
**Deliverables:** Local storage initially, export/import, later optional account sync

**Exit criterion:** Progress survives refresh; learners can export and restore it.

**Status at kickoff:** Planned

### Stage 6 — GitHub-based content editing
**Deliverables:** Content schema, preview, versioning and secure authenticated editing

**Exit criterion:** Edits use explicit authorization, produce reviewable commits/PRs, and cannot leak tokens.

**Status at kickoff:** Planned

### Stage 7 — Advanced agent engineering laboratory
**Deliverables:** Agent workflow demonstrations, test traces, safe sample sandboxes

**Exit criterion:** All examples are safe; agents require explicit authorization before risky tool actions.

**Status at kickoff:** Planned

### Stage 8 — Release quality and maintenance
**Deliverables:** Accessibility, tests, performance, SEO, CI and content review

**Exit criterion:** Mobile UX, automated checks, documentation, and deployment status verified.

**Status at kickoff:** Planned


## Engineering workflow
1. Read README, AGENTS.md, docs/STATUS.md and this roadmap.
2. Identify the current stage; do not silently expand scope.
3. Write minimal implementation and tests; verify build.
4. Record decisions and known limitations.
5. Update docs/STATUS.md and open/close tracking issues.
6. Preserve data and seek approval for destructive or credential-dependent actions.

## Content workflow
Draft outline → detailed lesson → examples and practical lab → checkpoint → review for accuracy → publish.

## Technical baseline
Vite + React + TypeScript; Tailwind CSS; Markdown stored in repository. GitHub Actions for build and Pages deployment. Learner progress first uses browser storage (not device-sync). Secure authenticated editor and account sync are later-stage decisions, not implemented now.

## Definition of done
Every shipped stage has working functionality, documented limitations, basic verification evidence and a status update. Never mark an outline as a complete lesson.
