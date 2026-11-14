# Design: Prompt to Agent Academy

Shared system for the overview, roadmap, lesson library, glossary, development stages and lesson reader.

## System
- Genre: modern-minimal.
- Shape: app screen within the existing learning workspace shell.
- Theme: Hallmark Dose, white ground, adapted for educational reading.
- Axes: light/grotesk-sans/chromatic-green. Posture: committed.
- Signature: numbered curriculum index and the working next published lesson.
- Preserve all lesson IDs, hash routes, curriculum facts and localStorage keys.

## Tokens
`src/tokens.css` contains the palette, spacing and type scales. `src/site.css` names workspace dimensions and the system font fallbacks.
- Paper: warm off-white; secondary surfaces: pale green.
- Ink: green-black. Muted text: dark green-grey.
- Accent: pharmacy green; reserved for controls, current selection and completion.
- Display: Schibsted Grotesk 700. Body: Instrument Sans 400, 500 and 700.
- Code: system monospace, only inside code content.
- Radius: 14px for surfaces, 10px for controls, full radius for tags.
- App type scale: 16px body, 14px metadata, 1.2 ratio for headings.

## Controls
- Primary: green fill with light text, 44px minimum height.
- Secondary: quiet outline, same radius and height.
- Visible focus rings, pressed bookmarks/categories, active-route indication.
- Keep loading, empty, error and completion states that the application supports.

## Layout
- Existing sidebar with a mobile disclosure; no route removed.
- Content capped at 1240px, centred in the space beside the sidebar.
- Lesson and curriculum lists separated by rules; tinted surfaces reserved for focus content.
- Reader prose at 16px; code and tables scroll within their own containers.

## Motion
Still by default. Only a small press response on controls. Respect reduced motion.

## Exports
`src/tokens.css`, `src/base.css`, `src/site.css`.
