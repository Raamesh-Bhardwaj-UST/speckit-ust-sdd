# Implementation Plan: Dark Mode Standardization

**Branch**: `001-dark-mode-standardization` | **Date**: 2026-09-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-dark-mode-standardization/spec.md`

## Summary

The app already has a `ThemeService`, a persisted preference, and a root `.dark` class, but most UI templates still hard-code light colors, the theme toggle is not mounted, and Material/CDK overlays are outside the themed wrapper. Standardize the SPA around one document-level theme boundary and shared semantic CSS tokens, then migrate all major surfaces and make the existing toggle reachable without introducing another theme state or dependency.

## Technical Context

**Language/Version**: TypeScript + Angular 20

**Primary Dependencies**: Angular, Tailwind CSS, Angular Material, ngx-markdown, RxJS/signals

**Storage**: Browser localStorage with the key `sentinel_mind_theme_mode`

**Testing**: Angular unit tests and targeted Playwright coverage for dark-mode regression validation

**Target Platform**: Web SPA running in the browser

**Project Type**: Brownfield single-page application

**Performance Goals**: Theme changes should update existing CSS without disruptive reflow, added network requests, or expensive runtime recomputation; no new dependencies.

**Constraints**: Preserve the `sentinel_mind_theme_mode` storage key and startup system-preference fallback. Keep `ThemeService` as the sole theme state owner. Use a document-level `.dark` selector so app content, Angular Material, and CDK overlays share the same state; update Material `color-scheme` behavior accordingly. Keep brand/status accents semantically distinct, and do not change auth, runtime config, or backend contracts.

**Scale/Scope**: Single SPA: app shell, header, welcome/agent cards, chat and markdown, navigation, file manager/panel, integrations, OpenAPI, policies, and transient Material/CDK surfaces. The browser favicon is currently coupled independently to OS preference and is not a core UI surface in this feature.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Gate Results
- Brownfield-Safe Evolution: PASS
  - Reuses the existing `ThemeService`, storage key, and class-based theme strategy; broad style migration is limited to the dark-mode acceptance scope.
- Quality Gates Before Completion: PASS
  - Requires service/root-class tests, targeted route/toggle Playwright coverage, lint/build checks, and contrast/overlay visual verification.
- User Experience Consistency: PASS
  - All in-scope surfaces and interaction states follow shared semantic tokens; keep status and brand accents distinguishable.
- Performance and Resilience: PASS
  - CSS variable changes avoid per-component runtime work and no library is added.
- Security, Trust, and Boundary Management: PASS
  - No backend/auth contract changes; only the existing non-sensitive browser theme preference is persisted.

No constitutional waivers are required for this work.

### Post-design Gate Recheck
- Brownfield-Safe Evolution: PASS; the design retains existing theme state and persistence while addressing the verified overlay boundary gap.
- Quality Gates Before Completion: PASS; unit, browser, lint/build, and visual checks are defined in the validation guide.
- User Experience Consistency: PASS; shared surface/state tokens cover routes, custom-agent surfaces, and overlays.
- Performance and Resilience: PASS; theme changes use CSS state/tokens with no added runtime dependency or per-component theme computation.
- Security, Trust, and Boundary Management: PASS; no auth, backend, or runtime configuration contracts change.
- No constitutional waivers are required after design.

## Project Structure

### Documentation (this feature)

```text
specs/001-dark-mode-standardization/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── theme-contract.md
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── components/
│   │   ├── agent-card/
│   │   ├── chat-input/
│   │   ├── chat-messages/
│   │   ├── files-side-panel/
│   │   ├── header/
│   │   ├── side-nav/
│   │   └── toggle-theme/
│   ├── pages/
│   │   ├── chat-page/
│   │   ├── files-page/
│   │   ├── integrations-page/
│   │   ├── logout-page/
│   │   ├── openapi-page/
│   │   ├── policies-page/
│   │   └── welcome-page/
│   ├── service/
│   │   ├── theme-service.ts
│   │   └── ...
│   ├── state/
│   ├── app.ts
│   └── app.routes.ts
├── custom-theme.scss
├── styles.css
└── main.ts
```

**Structure Decision**: Use a single Angular application structure and centralize dark-theme variables in the shared global stylesheet while leaving feature-specific logic inside the existing component/service architecture. The app-shell theme state remains in `ThemeService`, and all major component surfaces consume shared semantic tokens from `src/styles.css`.

## Implementation Approach

1. Keep `ThemeService` and `sentinel_mind_theme_mode` as the only preference state; expose its `.dark` state at the document boundary so app content and overlays respond together.
2. Define paired light/dark semantic tokens for page and raised surfaces, text hierarchy, borders, interactive states, focus, and status/brand accents; align Material `color-scheme` with the same state.
3. Mount the existing theme toggle in the shared header and migrate hard-coded light palette usage in all in-scope component and page templates to tokens.
4. Preserve intentional agent/status accents as semantic roles while requiring custom-agent surfaces to use shared surface, text, border, and state tokens.
5. Test preference initialization/persistence, document theme state, toggle behavior, representative routes, markdown, and overlays; manually inspect contrast and active/loading states.

## Phase Plan

### Phase 0: Research and alignment
- Confirm theme lifecycle, storage behavior, root selector ownership, Material/CDK overlay behavior, and existing theme-test expectations.
- Inventory current global tokens and fixed light colors across all in-scope templates.
- Resolve token, custom-agent, toggle placement, and validation decisions in `research.md`.

### Phase 1: Design and tokenization
- Specify `ThemePreference`, shared semantic token roles, component surfaces, and interaction-state rules in `data-model.md`.
- Specify the document-level theme and custom-agent token contract in `contracts/theme-contract.md`.
- Provide runnable unit/E2E and manual validation scenarios in `quickstart.md`.

### Phase 2: Implementation
- Update shared CSS variables in `src/styles.css` and any necessary Material theme adjustments.
- Refactor component-level dark-mode CSS to consume shared tokens rather than ad hoc overrides.
- Review agent cards, file panel, header, chat, and policy/integration screens for inconsistent sections.

### Phase 3: Validation
- Run Angular unit tests relevant to theme behavior and component rendering.
- Execute targeted Playwright checks for route transitions and theme toggling.
- Confirm no major view remains in a partially light treatment.

## Complexity Tracking

No constitutional violations or architectural exceptions are required for this feature. The design remains within the brownfield limitations of the current Angular/Tailwind application and reuses the existing app-level theme contract.
