# Prompt to Agent Academy

**Learn to specify, guide and verify AI engineering work.**

A GitHub-backed learning platform for **Prompt Engineering → Context Engineering → Agentic Engineering**. The curriculum has 8 modules and 40 stable lesson IDs; lessons are published incrementally.

## Quick links
- [Development roadmap](docs/DEVELOPMENT_PLAN.md)
- [Current project status](docs/STATUS.md)
- [Canonical curriculum](docs/CURRICULUM.md)
- [Technical jargon reference](docs/AGENTIC_GLOSSARY.md)
- [Reusable prompts for every stage](docs/SESSION_PROMPTS.md)
- [Lesson writing standard](docs/LEARNING_STANDARD.md)
- [Architecture decisions](docs/DECISIONS.md)
- [First full lesson](content/lessons/1-1.md)

## Development
Requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
npm run build
```

For GitHub Pages deployment, choose **Settings → Pages → Source → GitHub Actions**. The workflow builds and publishes the `dist/` folder. Expected URL once successfully deployed:
https://earl2k22.github.io/prompt-to-agent-academy/

## Content and progress
- Lessons and project guidance are stored in GitHub.
- Outlines are not mislabeled as published chapters.
- Initial learner progress is stored **only in this browser**; clearing storage or changing devices will not sync it.
- Secure, authenticated web-based editing is planned, not implemented.

## Continue work with ChatGPT
Open [docs/SESSION_PROMPTS.md](docs/SESSION_PROMPTS.md) and copy the prompt for the stage you want to implement. Always reference this repository so work can continue across devices and chats.

## License
No license has been selected. All rights remain with their respective owners until a license is added.
