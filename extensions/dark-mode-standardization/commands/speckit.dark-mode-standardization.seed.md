---
description: "Seed a Dark Mode Standardization feature (spec, plan guidance, tasks shape) from the observex-ui reference, then continue through the normal Spec Kit plan → tasks → implement flow for this repo's real stack."
---

## User Input

```text
$ARGUMENTS
```

Optional: a short-name override (default `dark-mode-standardization`) or extra scope notes.

Extension assets live in `.specify/extensions/dark-mode-standardization/assets/`.

## Steps

1. **Create the feature directory** the same way `/speckit-specify` does: run
   `.specify/scripts/powershell/create-new-feature.ps1 -Json -ShortName "dark-mode-standardization" "Standardize dark mode across all components"`
   (use the `.sh` script if this project uses `sh`). Note `SPECIFY_FEATURE_DIRECTORY` from the JSON output.
2. **Seed the spec**: copy `assets/reference-spec.md` to `<FEATURE_DIR>/spec.md`. Fill `[###-dark-mode-standardization]`,
   `[DATE]`, `[PRODUCT_NAME]`, `[LIST_MAJOR_SURFACES]`, and `[LIST_KEY_VIEWS]` from this repo's real screens
   (read `.github/instructions/architecture.instructions.md` if present). Adjust wording only; keep every FR/SC.
   Then offer `/speckit-clarify`.
3. **Plan**: read `assets/reference-plan-guidance.md` and then run the `/speckit-plan` flow for this repo. Ground every
   decision in real files: the framework, styling system, component library, and any existing theme code/storage key.
   Include the hard-coded-color audit result (file list) in the plan. Only reuse
   `assets/worked-example-angular/code/` verbatim if this repo is also Angular + Tailwind; otherwise use it as a pattern.
4. **Tasks**: run `/speckit-tasks`, using `assets/reference-tasks.md` as the phase/user-story shape, with real paths and commands.
5. **Before implementing**, search for existing theme/dark-mode code. If a partial or unwired implementation exists, plan
   to consolidate it; ask the user before deleting anything.
6. **Hand off** to `/speckit-implement` (or the **Developer** agent from `ust-sdd-agents`) unless the user asked to stop after tasks.

## Output

Report the feature directory, what was seeded (spec from reference; plan and tasks written for this repo's stack), and
open questions.
