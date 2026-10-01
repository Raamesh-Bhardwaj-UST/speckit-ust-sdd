# Tasks: Dark Mode Standardization

**Input**: Design documents from `/specs/001-dark-mode-standardization/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/theme-contract.md`

**Tests**: Included because the specification requires behavior/visual testability and the project constitution requires TDD for new behavior.

**Organization**: Tasks are grouped by user story. Shared semantic tokens are a blocking foundation; stories then implement and validate their independently testable scope.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks can be performed in parallel when they affect different files and have no unfinished dependencies.
- **[Story]**: Maps a task to the corresponding user story in `spec.md`.
- All paths are relative to the repository root.

## Phase 1: Setup

**Purpose**: Reuse the existing Angular, Tailwind, Material, Jasmine, and Playwright setup. No dependencies or project scaffolding are required.

## Phase 2: Foundational

**Purpose**: Establish the paired semantic roles required by every story before migrating component surfaces.

- [x] T001 Define paired light/dark semantic surface, foreground, border, focus, interaction, and status tokens in `src/styles.css`; align Angular Material system roles and `color-scheme` in `src/custom-theme.scss`.

## Phase 3: User Story 1 - Unified dark mode across the app shell (Priority: P1)

**Goal**: Major pages and components render coherently in both modes, including overlays.

**Independent Test**: Toggle modes in the authenticated browser suite and verify the header, routed views, shared surfaces, and a Material/CDK overlay change with the active theme.

### Tests for User Story 1

- [x] T002 [US1] Update the theme-toggle scenario in `playwright/tests/header-menus.spec.ts` to assert the document-root mode, computed surface changes, route persistence, and themed Help menu overlay. (Execution blocked: Playwright test credentials are not configured.)

### Implementation for User Story 1

- [x] T003 [P] [US1] Replace light-only surface, text, border, hover, and disabled utilities with shared semantic tokens in `src/app/components/chat-input/chat-input.html`, `src/app/components/chat-messages/chat-messages.html`, `src/app/components/file-attachment/file-attachment.html`, `src/app/components/files-side-panel/files-side-panel.html`, `src/app/components/side-nav/side-nav.html`, `src/app/components/not-found/not-found.html`, and `src/app/components/unauthorized/unauthorized.html`.
- [x] T004 [P] [US1] Replace light-only surface, text, border, hover, and disabled utilities with shared semantic tokens in `src/app/pages/chat-page/chat-page.html`, `src/app/pages/files-page/files-page.html`, `src/app/pages/integrations-page/integrations-page.html`, `src/app/pages/openapi-page/openapi-page.component.html`, `src/app/pages/policies-page/privacy-policy/privacy-policy.html`, `src/app/pages/policies-page/terms-of-use/terms-of-use.html`, `src/app/pages/welcome-page/welcome-page.html`, and `src/app/pages/logout-page/logout-page.html`.

## Phase 4: User Story 2 - Theme preference is preserved and predictable (Priority: P1)

**Goal**: Saved/system preference resolution, user toggle, and document theme state remain consistent across reloads and routes.

**Independent Test**: Unit-test preference precedence and persistence, then use the header toggle to switch modes and confirm the document root and storage value update.

### Tests for User Story 2

- [x] T005 [P] [US2] Add Jasmine tests in `src/app/service/theme-service.spec.ts` for valid saved preference precedence, system fallback, explicit toggle persistence, and document-root class synchronization.

### Implementation for User Story 2

- [x] T006 [US2] Implement valid-mode resolution and document-root `.dark` synchronization in `src/app/service/theme-service.ts`, retaining the `sentinel_mind_theme_mode` key and startup `prefers-color-scheme` fallback.
- [x] T007 [P] [US2] Remove the wrapper-only theme binding from `src/app/app.html` and obsolete theme derivation from `src/app/app.ts` so there is one document-root theme boundary; initialize `ThemeService` at app bootstrap and remove its unused mock from `src/app/app.spec.ts`.
- [x] T008 [P] [US2] Make `src/app/components/toggle-theme/toggle-theme.html` an accessible button with an action label and pressed state; mount `ToggleTheme` in `src/app/components/header/header.ts` and `src/app/components/header/header.html`, and migrate header/Help-menu colors to semantic tokens.

## Phase 5: User Story 3 - Modular theming is reusable and maintainable (Priority: P2)

**Goal**: Data-driven/custom agent surfaces use shared theme roles without losing intentional semantic accents.

**Independent Test**: Render enabled agent cards in both modes; shared surfaces and text adapt while icon/status accents remain legible and meaningful.

### Tests for User Story 3

- [x] T009 [US3] Extend `playwright/tests/header-menus.spec.ts` to verify an agent card's shared surface changes between modes while its semantic icon/status accent remains visible. (Test discovery passes; authenticated execution blocked by missing test credentials.)

### Implementation for User Story 3

- [x] T010 [US3] Migrate `src/app/components/agent-card/agent-card.html`, `src/app/components/agent-card/agent-card.css`, and presentation maps in `src/app/components/agent-card/agent-card.ts`, `src/app/pages/files-page/files-page.ts`, and `src/app/pages/integrations-page/integrations-page.ts` to shared tokens and theme-aware accent roles.

## Phase 6: Polish and cross-cutting validation

**Purpose**: Run the documented project quality gates and confirm the feature contract end to end.

- [x] T011 Run `specs/001-dark-mode-standardization/quickstart.md` validation: `npm test -- --watch=false`, `npm run lint`, `npm run build`, and the authenticated Playwright theme-toggle scenario; record any environment-blocked browser check. (Lint/build pass; 42/48 unit tests pass, with 4 unrelated missing-HttpClient-provider failures and 2 existing OpenAPI selector expectation failures; authenticated Playwright execution is blocked because test credentials are unset.)

## Dependencies and execution order

- T001 is foundational and blocks all user-story implementation.
- T002 is the US1 browser test and precedes surface migration in T003/T004.
- T005 precedes ThemeService behavior changes in T006; T006 precedes root-shell and header integration in T007/T008, which can run in parallel.
- T002 and T009 edit the same Playwright file and must run sequentially; T009 precedes custom-agent surface changes in T010.
- T011 follows all story tasks.
- US1 and US2 are both P1; shared tokens (T001) are required before either story. US3 follows the shared token foundation and can be validated independently after its card-specific test.

## Parallel opportunities

- **US1**: After T001 and T002, T003 and T004 can proceed in parallel because they edit separate component and page templates.
- **US2**: T005 can proceed in parallel with T003/T004 after T001. After T005/T006, T007 and T008 can proceed in parallel because they update separate app-shell and header files.
- **US3**: No intra-story parallel batch; T009 must run before T010, and T009 shares the Playwright file with T002.

## Parallel Execution Examples

### User Story 1

```text
After T001 and T002:
Run T003 (component templates) and T004 (page templates) in parallel.
```

### User Story 2

```text
After T001:
Run T005 alongside US1 template work (T003/T004).
After T006:
Run T007 and T008 in parallel.
```

### User Story 3

```text
Run T009 first, then T010; both are sequential because T009 is the test for T010.
```

## Implementation strategy

Complete T001 first, then deliver the P1 app-wide coverage and preference/toggle stories. Complete the P2 custom-agent surface story, then run the full quickstart gate. No new package or backend work is planned.

## Phase 7: Convergence

- [ ] T012 Complete authenticated visual verification of chat/markdown/composer, side navigation, files/upload/panel states, integrations, OpenAPI, both policy routes, Material/CDK overlays, and focus/hover/selected/disabled/feedback states in both modes; record results against `specs/001-dark-mode-standardization/quickstart.md` per plan Phase 3, FR-001/004/005/007/010, SC-001/002/004, and US1/US2/US3 acceptance scenarios (HIGH; partial).