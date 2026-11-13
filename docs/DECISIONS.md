# Architecture decisions

## ADR-001 — GitHub as canonical storage
**Decision:** All product specs and publishable lessons live in the repository.
**Why:** Portable, versioned, and independently accessible from work or home.
**Tradeoff:** Web editing requires GitHub UI or future authenticated integration.

## ADR-002 — Static site first
**Decision:** Vite + React + TypeScript, with Tailwind CSS, deployed through GitHub Actions to GitHub Pages.
**Why:** Low hosting cost and easy automatic deployment of content changes.
**Tradeoff:** No server-side accounts or editing API in Stage 1.

## ADR-003 — Progress stored locally
**Decision:** Use per-browser localStorage initially; explain that clearing storage can remove progress.
**Why:** No accounts, secrets, or backend required for the first usable release.
**Future:** Add export/import, then optional authentication and sync.

## ADR-004 — Stable IDs
**Decision:** Keep lesson identifiers 1.1–8.5 and stable route slugs.
**Why:** Enables reliable saved progress and interlinking.

## ADR-005 — Safe future editing
**Decision:** Do not embed GitHub personal access tokens in client-side code.
**Why:** GitHub Pages is public static hosting. Any editor must use a protected, appropriately scoped authentication flow and reviewable writes.

## ADR-006 — Publishing versus outlines
**Decision:** A lesson can be an outline, draft, review, or published.
**Why:** Prevents unfinished course content from being presented as completed instruction.
