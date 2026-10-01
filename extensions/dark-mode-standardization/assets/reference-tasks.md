# Tasks shape: Dark Mode Standardization

Use this **shape**; write concrete tasks with real paths and commands from the target repo's `plan.md`.

- **Phase 1 – Setup**: usually none (reuse existing tooling). If a partial/unwired theme implementation exists, add a task to consolidate it (ask before deleting anything).
- **Phase 2 – Foundational (blocks all stories)**: T001 define paired semantic tokens + component-library theme alignment + `color-scheme`.
- **Phase 3 – US1 Unified dark mode (P1)**
  - Test: E2E asserting root marker, a computed surface color change, route persistence, and an overlay (menu/dialog) that follows the theme.
  - Impl: migrate hard-coded colors to tokens, split into parallel [P] tasks by folder (components vs pages).
- **Phase 4 – US2 Preference (P1)**
  - Test: unit tests for saved-value precedence, OS fallback (not persisted), toggle persistence, root sync.
  - Impl: theme owner resolves/applies at the document root; remove wrapper-level bindings; accessible toggle mounted in the shared header.
- **Phase 5 – US3 Modular theming (P2)**
  - Test: a specialised/custom surface changes shared surface color while its accent stays visible.
  - Impl: migrate specialised surfaces and any color maps in code to token roles.
- **Phase 6 – Polish**: run the quickstart validation (unit, lint, build, E2E); record anything blocked by the environment (e.g. missing E2E credentials).

Dependencies: T001 → everything; each story's test precedes its implementation; tasks editing the same file run sequentially.
