# Quickstart Validation Guide

## Prerequisites
- Node.js 22 and dependencies installed with `npm ci`.
- Access to an authenticated test deployment for Playwright; set `PLAYWRIGHT_BASE_URL`, `PLAYWRIGHT_DEV_USERNAME`, and `PLAYWRIGHT_DEV_PASSWORD` as required by `playwright.config.ts` and `playwright/tests/auth.setup.ts`.
- A browser for manual review of a session with enabled agents and integrations.

## Automated Checks
Run from the repository root:

```powershell
npm test -- --watch=false
npm run lint
npm run build
npm run test:functional:dev -- --grep "theme toggle switches"
```

Expected results:
- Unit tests pass for saved/system preference resolution, explicit toggle persistence, and document-root theme application.
- Lint and production build pass without style or template errors.
- The authenticated Playwright theme scenario switches both modes, observes the document root class and persisted value, and confirms representative computed surface colors change.

## Browser Scenarios
1. Open the welcome page with no saved preference, then with each valid saved preference. Confirm the initial mode follows the saved preference, or the current OS setting when no valid value exists.
2. Use the header control to switch modes. Confirm the document `<html>` element reflects the active mode, local storage contains the explicit choice, and the header reports the mode accessibly.
3. In both modes, visit welcome/agent cards, chat/messages/composer, side navigation, files/file panel, integrations, OpenAPI, and both policy pages. Confirm each uses coherent surfaces and readable text/state colors.
4. Open a Material/CDK menu, select, tooltip, or dialog while dark mode is active. Confirm the portaled surface matches the document theme.
5. In chat, switch threads/agents and observe a streaming or loading state; in files, inspect upload/empty/processing/error states. Confirm the mode persists and interactions remain legible.
6. Check keyboard focus, hover, selected, disabled, success, warning, and error treatments; confirm custom-agent accents do not compromise text contrast.

## Pass Criteria
All automated commands pass, both modes remain consistent across the listed routes and overlays, the explicit selection survives reload, system fallback works when no valid value is saved, and no core surface or interaction state is light-only or unreadable. See [data-model.md](./data-model.md) and [contracts/theme-contract.md](./contracts/theme-contract.md) for the token and state requirements.
