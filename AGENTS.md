# Contributor and coding-agent instructions

Project: Prompt to Agent Academy, an educational React/TypeScript static website for prompt engineering, context engineering and agentic engineering.

## Before acting
- Read docs/STATUS.md, docs/DEVELOPMENT_PLAN.md, docs/CURRICULUM.md and docs/DECISIONS.md.
- Respect the user's selected stage. Do not silently rewrite the canonical roadmap or lesson numbering.
- Distinguish outline content from reviewed/published lessons.
- Never claim builds or GitHub Pages deployments passed without seeing evidence.

## Code expectations
- Prefer small, maintainable changes; maintain TypeScript types and responsive accessibility.
- Build with `npm run build`; typecheck where configured.
- Use Vite base path `/prompt-to-agent-academy/` for GitHub Pages.
- Keep lesson IDs stable and progress state backward-compatible.
- No credentials in source, especially not GitHub PATs in client-side code.
- Avoid destructive operations. Seek approval for data deletion or secrets-dependent work.

## Content expectations
- Follow docs/LEARNING_STANDARD.md and the canonical docs/CURRICULUM.md.
- Use clear definitions, practical examples, labs and checkpoints.
- Explain uncertainty, cite authoritative materials where relevant, and do not use jargon as decoration.

## Finishing a stage
- Report the exact files affected, commands/tests run, known limitations and next task.
- Update docs/STATUS.md and corresponding tracking issue when applicable.
- Keep GitHub as the single source of truth between conversations.
