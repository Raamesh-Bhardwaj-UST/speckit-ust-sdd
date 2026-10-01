# Plan guidance: Dark Mode Standardization

This is guidance for writing a **real** `plan.md` for the target repo. Don't copy it as the plan.
It captures the decisions and lessons from the observex-ui build (Angular 20 + Tailwind + Angular Material),
see `worked-example-angular/spec/` for that repo's actual plan, research, data model, contract, and tasks.

## Decisions that transfer to any stack
1. **One theme owner.** Exactly one module/service/store owns the active mode. If one already exists, keep it
   (and its storage key/format) and don't add a second one.
2. **Document-root boundary.** Put the theme marker (e.g. `.dark` class or `data-theme`) plus `color-scheme` on
   `<html>`, not on an inner wrapper. Portals, overlays, dialogs, menus, and toasts usually render outside the app
   root; a wrapper-level class misses them. (This was the main bug found in observex-ui.)
3. **Preference resolution.** Valid saved value → use it. Otherwise → OS `prefers-color-scheme`. Only an explicit
   user toggle is persisted; the startup fallback isn't.
4. **Semantic tokens, paired per theme.** Define CSS custom properties (or the design-system equivalent) for:
   page/raised/inset/overlay surfaces; primary/secondary/muted/disabled text; default/strong borders;
   hover/selected/disabled states; focus ring; brand accent; success/warning/danger/info. Map them into the styling
   system (Tailwind theme, CSS-in-JS theme, SCSS vars, component-library theme) so components use role names, not raw colors.
5. **Component library alignment.** Point the component library's own theme (Material, MUI, Vuetify, Bootstrap, etc.)
   at the same root marker/tokens so its surfaces and native controls follow the mode.
6. **Audit hard-coded color debt before claiming "all components".** Search templates/styles for light-only literals
   (e.g. `bg-white`, `text-gray-*`, `#fff`, `rgb(`) and list every file in the plan. In observex-ui most of the work
   was this migration, not the toggle.
7. **Accessible toggle.** A real `<button>` with an action label and `aria-pressed`, mounted somewhere reachable
   (the shared header). Check that the toggle is actually rendered, not just present in code.
8. **Accents stay semantic.** Brand, agent, and status accents may stay distinct, but must remain legible on both
   themes' surfaces and must not replace the shared surface/text tokens.
9. **No new dependencies** and no per-component runtime theme computation; switching the root marker should be enough.

## Constitution check hints (UST brownfield preset)
- Brownfield-safe: reuse existing theme state + storage key.
- Quality gates: unit tests for resolution/persistence/root sync; E2E for toggle + route + overlay; lint/build.
- UX consistency: every in-scope surface and interaction state uses shared tokens.
- Performance: CSS-variable switch only.
- Security: only a non-sensitive preference is stored in the browser.
