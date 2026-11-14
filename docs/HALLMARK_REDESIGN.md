# Hallmark workspace redesign

Date: November 15, 2026 (Asia/Manila).

The existing React application now uses Hallmark v2's Dose material: warm paper, green-black ink, a pale green workspace rail and forest-green actions. This is a full visual redesign of the six existing route types, with published, outline and missing-lesson states checked separately.

## Scope and preservation

- Recompose the overview around the existing next-lesson action, followed by course figures and a numbered curriculum index.
- Flatten nested cards into rules, lists and selective tinted surfaces.
- Use readable 16px prose, 14px metadata, visible focus indicators and touch-sized controls.
- Preserve the 8 modules, 40 stable lesson IDs, 1 published lesson, 38 glossary terms and 9 development stages.
- Keep hash routes, GitHub destinations, catalog parsing, content files, progress/bookmark storage keys and completion eligibility unchanged.
- Add a keyboard skip link, mobile navigation close button, expanded navigation state, current-page indication and pressed bookmark/category state.
- Do not change the canonical roadmap or advance a content milestone.

## Files

- Edit `src/App.tsx`: presentation, next-lesson placement and accessible state attributes.
- Edit `src/site.css`: shared workspace and responsive styles.
- Edit `index.html`: font loading and browser theme colour.
- Add `src/tokens.css` and `src/base.css`: Hallmark scaffold.
- Add `design.md`: shared system for future pages.
- Add this review record and update `docs/STATUS.md`.
- Add `.hallmark/preflight.json` and `.hallmark/log.json` as design provenance; screenshots and transient records stay ignored.
- Delete no routes, component definitions or source files. Change no dependency versions.

## Copy adjustments

All lesson articles, glossary definitions, curriculum facts and lab instructions remain verbatim in their source files.

- Overview lead: “A structured path to prompting, context engineering and building AI workflows that actually work. Learn the concepts, practice the tools, and verify the results.” → “Learn prompting, context engineering and AI workflows. Practice, then verify.” (Hallmark copy/screen budget.)
- Remove redundant banners under gate 54: “YOUR ENGINEERING LEARNING SPACE”, “LEARNING PATH” above Your curriculum, “PICK UP WHERE YOU LEFT OFF”, “OPEN DEVELOPMENT”, “THE FULL LEARNING JOURNEY”, “KNOWLEDGE LIBRARY”, “SPEAK WITH PRECISION”, “BUILDING IN PUBLIC”, “CONTINUE THE BUILD” and “YOUR POSITION”. Navigation still names the learning path.
- “PRACTICAL ACTIVITY” becomes the aside's “Practical activity” heading.
- Change the academy label, navigation labels, lesson number, week/module caption, outline notice and “USE IT LIKE THIS” to sentence case.
- “Alpha · v0.1” → “Alpha v0.1”; lesson results use a comma; the footer uses a full stop.
- “← All lessons” → “All lessons”; the lesson title separates ID and title with a colon.
- The glossary introduction changes its em dash to a comma. Its meaning is unchanged.
- Remove the decorative orbit, stat icon tiles and release dot. No product information or action depended on them.

## Verification

- `npm run build`: content checks, TypeScript and production Vite build pass.
- Hallmark static/render audit: eight representative routes, at widths 320, 375, 414, 768, 1024, 1280, 1440 and 1920.
- Before: 210 Floor failures, 105 Reflex findings. The initial unstamped stylesheet accounts for many static findings; these are design lint counts, not a count of independent user-visible defects.
- After: 0 Floor failures, 0 unwaived Reflex findings, 0 warnings; one waived gate (49b) covers five wrapping source-link findings.
- Preservation check: 28/28 recorded links, 9/9 handlers, 10/10 headings and 5/5 figures retained. Controlled fields additionally exercised through browser checks.
- Browser regression checks pass for lesson search, module filters, empty states, glossary search/categories, bookmarks after reload, completion after reload, outline completion restrictions and mobile navigation.
- No browser JavaScript errors observed. No document overflow at any checked width.
- Visual review performed in-thread, as required by Hallmark's Codex harness guidance. Corrected desktop menu control visibility and the reader's line length during review.

## Limits and next work

Google Fonts require a network connection; the system font fallbacks remain usable offline. Progress still lives in this browser. New articles, assessments and cross-device sync are outside this design change. Full source URLs in the existing lesson wrap on narrow screens; Hallmark gate 49b is waived to preserve readable evidence links and prevent horizontal scrolling.

The pull request is the reviewable handoff. GitHub Pages continues to deploy from `main` through the existing workflow when the change is merged. This work does not claim a new production deployment.
