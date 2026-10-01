# Research and Design Notes

## Decision: Keep one persisted theme state and move its class boundary to the document root

`ThemeService` remains the sole owner of the mode and continues to use `sentinel_mind_theme_mode`, with startup fallback to `prefers-color-scheme`. Apply the resolved state to the document `<html>` element so Angular Material/CDK overlays attached under `<body>` receive the same `.dark` selector as routed content. The existing wrapper-only selector is insufficient for overlays, and the current global Material stylesheet explicitly declares `color-scheme: light`.

**Rationale**:
- Preserves the existing service, storage key, and signal-based state model in `src/app/service/theme-service.ts`.
- Covers portaled overlay content without maintaining separate theme state or duplicating classes across pages.
- Keeps system preference as the initial fallback; later OS changes do not override the app mode during an active session, matching current behavior.

**Alternatives considered**:
- Keep `.dark` only on the app wrapper: rejected because CDK/Material overlays are rendered outside that wrapper.
- Mirror `.dark` on both the wrapper and document: rejected because two class locations create avoidable synchronization and test complexity.
- Add a theme dependency or new user-profile setting: rejected because neither is needed for the existing browser-scoped preference.

## Decision: Use semantic CSS custom properties as the shared palette contract

Define paired light/dark tokens in `src/styles.css` for page and raised surfaces, text hierarchy, borders, hover/selected/focus/disabled states, and semantic brand/status colors. Components, Tailwind utilities, and Angular Material system-token overrides should consume the same semantic roles.

**Rationale**:
- Current global variables cover only a small subset of UI roles; an inventory found fixed light palette values across 17 HTML files, including chat, agent cards, side navigation, files, integrations, OpenAPI, and policies.
- CSS variables work across component styles, Tailwind utilities, native controls, and Material styling without per-component mode logic.
- The global theme is already imported with Tailwind and the app already uses CSS custom properties.

**Alternatives considered**:
- Add `dark:` variants and fixed color utilities per element: rejected as the canonical approach because duplicated light/dark pairs are difficult to audit and extend.
- Keep raw hex colors in component templates: rejected for surface/text/state roles because that prevents consistent theme switching.
- Replace the Angular Material theme or add a theme library: rejected; retain the existing M3 palette and map/override its system-level roles for both modes.

## Decision: Expose the existing theme control in the shared header

Mount the existing `ToggleTheme` control from the shared header, update its accessible name/state to report the active mode, and preserve the existing service toggle behavior. No new route or theme control component is needed.

**Rationale**:
- The current `ToggleTheme` exists but is not included in any template.
- `playwright/tests/header-menus.spec.ts` already expects `app-toggle-theme` and asserts a visible theme change plus local-storage persistence.
- A shared header control makes the selected mode available across routes.

**Alternatives considered**:
- Leave the theme programmatically selectable only: rejected because the feature requires users to switch modes and existing E2E coverage expects a visible control.
- Create a second toggle implementation: rejected as duplicate behavior.

## Decision: Keep custom-agent accents, but require shared surface and state tokens

Custom agent identity and status may use semantic accent roles; agent-defined surfaces must use the shared background, foreground, border, focus, and interaction tokens and remain legible in both modes. Do not require every brand/status accent to become neutral.

**Rationale**:
- The feature requires custom-agent compatibility while the app catalogue already contains agent-specific icon/color presentation.
- Reserving accent roles preserves meaning without allowing a custom palette to reintroduce light-only surfaces.

**Alternatives considered**:
- Prohibit all agent-specific colors: rejected because it removes useful identity/status signaling.
- Permit unrestricted per-agent colors: rejected because contrast and cross-theme behavior become unauditable.

## Decision: Validate service behavior and rendered surfaces at different levels

Add deterministic unit coverage for saved/system preference resolution, toggle persistence, and root-class synchronization. Use the existing header theme-toggle Playwright scenario as the end-to-end baseline and extend it to representative surfaces/routes and an overlay. Keep manual contrast inspection for combinations that cannot be reliably asserted by the current test harness.

**Rationale**:
- `theme-service.spec.ts` currently checks construction only.
- `header-menus.spec.ts` contains an existing theme-toggle scenario but currently cannot find the unmounted control.
- Angular unit tests use Karma/Jasmine, while authenticated browser tests use the configured Chromium Playwright project.

**Alternatives considered**:
- Rely only on snapshots/manual checks: rejected because state persistence and root mode can be tested deterministically.
- Treat unit tests as sufficient: rejected because fixed template colors, route surfaces, and portaled overlays require browser rendering checks.

## Unknowns resolved

- Theme boundary: document `<html>` `.dark` state, so routed views and Material/CDK overlays share it.
- Preference lifecycle: retain saved preference first, then startup system preference; do not add an OS-change listener.
- Material: retain Angular Material 3 and align its surface/foreground system tokens and browser `color-scheme` with the active mode.
- Toggle placement: shared header, using the existing component; update the existing Playwright expectation rather than creating a parallel control.
- Custom agents: shared semantic surface/state roles with permitted semantic accents.
- Favicon: excluded from this UI standardization; its existing OS-based behavior is independent and does not block app theme correctness.
- No backend/API, auth, runtime configuration, or new dependency changes are needed.
