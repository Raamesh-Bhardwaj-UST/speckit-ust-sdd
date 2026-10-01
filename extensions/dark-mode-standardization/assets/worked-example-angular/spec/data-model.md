# Data Model: Dark Mode Standardization

## Overview
This feature adds no business entity, backend persistence, or API contract. Its design model consists of one browser-scoped theme preference and the semantic tokens consumed by rendered surfaces.

## Entities

### ThemePreference
The single active UI mode managed by `ThemeService`.

**Fields**
- `mode`: `light_mode` or `dark_mode`
- `storageKey`: `sentinel_mind_theme_mode`
- `source`: valid saved preference, otherwise startup `prefers-color-scheme` fallback

**Relationships**
- The mode is reflected by the document root `.dark` class and `color-scheme`.
- The shared header toggle changes the mode and persists the explicit selection.
- It remains browser-local and is not synchronized to profile/backend state.

### SurfaceTokenSet
Paired light/dark semantic values that define the shared presentation contract.

**Token roles**
- Page and raised/container surfaces
- Primary, secondary, and muted foregrounds
- Borders and dividers
- Hover, selected, active, and disabled states
- Focus indicator
- Semantic brand, success, warning, and error accents
- Material system surface/foreground aliases and native `color-scheme`

**Relationships**
- Global CSS variables are the source for component, Tailwind, and Material surface/state styling.
- Components may compose tokens but must not define a conflicting per-component theme system.

### ComponentSurface
An app shell, page, component, markdown region, or portaled overlay that renders within the active theme.

**Fields**
- `surfaceRole`: page, raised, inset, overlay, or content
- `requiredTokens`: surface, foreground, border, and applicable interaction/status roles
- `states`: default, hover, focus-visible, selected/active, disabled, and feedback states as applicable
- `accentExtension`: optional semantic brand or status role; not a replacement for shared surface tokens

**Relationships**
- All surfaces inherit the single document-root theme state.
- Custom-agent surfaces are `ComponentSurface` instances and use the same shared surface and state roles.

## Validation Rules
- Exactly one valid mode is active; invalid or absent stored values resolve through the startup system-preference fallback.
- A user toggle persists the selected valid mode under the existing storage key.
- Both themes define every required semantic role; no core surface depends on a light-only literal when a role exists.
- Text, focus indicators, and interactive/status states remain perceivable in both modes.
- Intentional brand/status accents are allowed only when their foreground and surrounding surface remain legible.
- App content and Material/CDK overlays observe the same document-root theme state.

## State Transitions
- Startup with a valid saved value: restore that mode and apply the document root class/color scheme.
- Startup without a valid saved value: resolve the current OS preference and apply that mode without persisting an implicit user choice.
- User toggle: switch modes, update root styling synchronously, and persist the explicit choice.
- Route change, streaming, and file processing: retain the selected mode; no theme-specific business-state transition occurs.
