<!--
Sync Impact Report
- Version change: [OLD_VERSION] -> [NEW_VERSION]
- Modified principles: [LIST]
- Added sections: [LIST]
- Removed sections: [LIST]
- Deferred TODOs: [LIST]
-->

# [PROJECT_NAME] Constitution

## Core Principles

### I. Brownfield-Safe Evolution
This project is a live [PROJECT_TYPE] with existing runtime configuration, authentication, integrations, and deployment assumptions ([LIST_THE_REAL_ONES_FROM_THE_REPO]). Every feature change MUST respect existing contracts, data flow, and deployment assumptions; broad refactors are permitted only when they reduce risk or remove a demonstrated defect. New work MUST be traceable to the current architecture and MUST NOT silently break environment-driven configuration, auth flows, or session behavior.

### II. Quality Gates Before Completion
All user-visible work MUST meet the project's quality bar before completion: deterministic tests ([UNIT_TEST_TOOL]), relevant linting ([LINT_TOOL]), a successful build ([BUILD_COMMAND]), and manual verification for flows that depend on external systems. TDD is required for behavioral fixes and new logic, with failing checks before implementation and proof of verification before merge. Regression risk is unacceptable when a change is only "likely" correct.

### III. User Experience Consistency
The product MUST present a consistent, understandable, and accessible experience across [MAJOR_SURFACES]. Navigation, empty states, loading states, errors, and feedback MUST use the same patterns everywhere. Accessible interactions, clear affordances, and predictable defaults are non-negotiable, especially for forms, authentication, uploads, and other high-risk flows.
<!-- For backend/CLI/library repos, reinterpret as "Interface Consistency": consistent API/CLI shapes, error formats, and documentation. -->

### IV. Performance and Resilience
Feature decisions MUST optimize for perceived responsiveness and graceful degradation. Network calls should be minimized, caching used where it avoids repeated expensive work, and long-running actions should be explicit and cancellable. When external systems are slow or unavailable, the system MUST communicate status clearly without leaving users in a dead end.

### V. Security, Trust, and Boundary Management
Authentication, session handling, token flows, and third-party integrations MUST be treated as privileged boundaries. Secrets and tokens MUST never be committed or shipped to clients; runtime config MUST remain environment-scoped; user-generated content MUST be sanitized and safely rendered. Changes to auth, session timing, or any API contract MUST be reviewed for security impact before release.

## Engineering Constraints

This project is intentionally built as a brownfield [STACK_SUMMARY]. The following constraints are non-negotiable:
- Keep compatibility with the existing [FRAMEWORK_PATTERNS] architecture.
- Treat [RUNTIME_CONTRACT_FILES] as runtime contracts, not implementation details.
- Respect the current [AUTH_AND_SESSION_MODEL] boundaries.
- Keep third-party connectors and external API integrations isolated behind service boundaries.
- Preserve the distinction between app configuration, UI/app state, and persisted data; avoid hidden global state without a documented reason.
- Favor explicit contracts and small, testable modules over broad "cleanup" refactors that do not address a concrete requirement.
- Maintain quality across development, test, and production environments.
[ADDITIONAL_STACK_CONSTRAINTS]

## Delivery Workflow

All work in this repository MUST follow a disciplined delivery workflow:
- Start from a clearly scoped requirement, design decision, or defect with explicit acceptance criteria.
- Validate existing assumptions (read `.github/instructions/architecture.instructions.md` when present) before changing infrastructure, UI flows, or API integrations.
- Write or update the relevant tests before finalizing the fix whenever behavior changes.
- Implement the minimal change that addresses the root cause and keeps the architecture coherent.
- Verify the relevant quality gates: unit tests, targeted lint/build checks, and manual confirmatory checks for environment-sensitive flows.
- Record decisions that affect UX, API contracts, or performance so future contributors do not re-discover the same trade-offs.

## Governance

This Constitution supersedes informal preferences and short-term expediency. Any technical decision MUST be evaluated against these principles first, with trade-offs documented when a rule is intentionally constrained or waived.

Amendments MUST:
- state the reason for the change and the impacted principle or section;
- preserve the project's brownfield compatibility and user trust commitments;
- include a version bump (semantic versioning) and the date of the amendment;
- confirm whether affected tests, docs, or operational guidance require updates.

Compliance review is mandatory for any change that affects product-critical flows, authentication/session behavior, integration contracts, performance-sensitive paths, or user-facing state transitions. If a change conflicts with these principles, the team MUST either redesign the solution or justify the exception in writing before merge.

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
