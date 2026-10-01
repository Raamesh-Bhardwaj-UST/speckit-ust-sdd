# Theme Contract

## Scope
This is a frontend presentation contract. It introduces no backend endpoint, request, or runtime configuration field.

## Theme State
- `ThemeService` is the sole owner of the active mode.
- Supported stored values are `light_mode` and `dark_mode`, using the existing `sentinel_mind_theme_mode` key.
- Startup resolution prefers a valid stored value; otherwise it uses the current `prefers-color-scheme` value.
- Explicit user changes persist. A system-derived startup fallback does not become a saved user choice.
- The active mode is reflected at the document `<html>` root with `.dark` and matching `color-scheme`, covering routed content and Material/CDK overlays.
- The existing shared-header toggle exposes the current state accessibly and changes the same service state.

## Semantic Styling
Global CSS custom properties provide paired values for page/raised/inset/overlay surfaces, foreground hierarchy, borders, hover/selected/disabled states, focus, and semantic brand/status accents. Angular Material system surface/foreground roles and native controls follow the same active mode.

Components and custom-agent surfaces MUST:
- use shared semantic roles for surfaces, text, borders, and interaction states;
- provide visible focus, hover, selected/active, and disabled states where applicable;
- retain legible contrast for content and status indicators in both modes;
- keep permitted brand/status accents semantic and bounded to their role;
- avoid component-local mode logic or light-only raw color values where a shared role exists.

## Validation Contract
A compliant surface renders coherently in both modes, including when reached through route navigation or rendered in a portaled overlay. Changing mode updates all in-scope surfaces without losing active app state. Automated checks cover preference resolution/persistence, root state, and representative browser-rendered surfaces; visual review checks contrast and state clarity.
