---
description: Create or update the project constitution from the UST brownfield template, grounded in this repository's real stack and architecture.
strategy: wrap
handoffs:
  - label: Build Specification
    agent: speckit.specify
    prompt: Implement the feature specification based on the updated constitution. I want to build...
---

## UST Brownfield Grounding (runs before the core flow)

This project uses the **UST Brownfield SDD** preset. The constitution template already contains
five fixed principles (Brownfield-Safe Evolution, Quality Gates, UX Consistency, Performance &
Resilience, Security & Boundaries), an Engineering Constraints section, and a Delivery Workflow.
Keep those principles and their MUST-level rules. Your job is to fill the bracketed
placeholders with facts from **this** repository.

1. Read `.github/instructions/architecture.instructions.md` if it exists. If it does not, tell
   the user that running the **Architecture Discovery** agent first (from the `ust-sdd-agents`
   extension) produces much better grounding, then continue from repo evidence.
2. Determine from real files (for example `package.json`, `pom.xml`, `*.csproj`, `pyproject.toml`,
   `go.mod`, build configs, CI workflows, test configs):
   - `[PROJECT_NAME]`, `[PROJECT_TYPE]`, `[STACK_SUMMARY]`, `[FRAMEWORK_PATTERNS]`
   - `[UNIT_TEST_TOOL]`, `[LINT_TOOL]`, `[BUILD_COMMAND]`
   - `[MAJOR_SURFACES]`, `[RUNTIME_CONTRACT_FILES]`, `[AUTH_AND_SESSION_MODEL]`
   - `[ADDITIONAL_STACK_CONSTRAINTS]`: zero or more extra bullets, each backed by a file path
3. Never invent a tool or file. If something can't be determined, write
   `TODO(<PLACEHOLDER>): <what is needed>` and list it under Deferred TODOs in the Sync Impact Report.
4. Never copy secrets, tokens, client IDs, or `.env*` values. Refer to keys by name only.
5. Principle III: for backend, CLI, or library repos, reword it as "Interface Consistency" (see the
   HTML comment in the template) instead of dropping it.

{CORE_TEMPLATE}
