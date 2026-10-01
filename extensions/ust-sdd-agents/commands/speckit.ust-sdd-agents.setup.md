---
description: "Install the UST SDD custom Copilot agents (Architecture Discovery, Spec Generation & Enrichment, Developer) into .github/agents and seed the architecture-context file."
---

## User Input

```text
$ARGUMENTS
```

Arguments are optional. `force` means overwrite existing agent files.

## Steps

1. Confirm `.specify/extensions/ust-sdd-agents/assets/agents/` exists. If it doesn't, tell the user
   to run `specify extension add ust-sdd-agents` (or install the `ust-sdd` bundle) and stop.
2. Run the installer from the repository root:
   - PowerShell: `pwsh -NoProfile -File .specify/extensions/ust-sdd-agents/scripts/powershell/install-agents.ps1`
     (append `-Force` only if the user passed `force`).
   - If PowerShell isn't available, copy the files yourself: every file in
     `assets/agents/` goes to `.github/agents/`, and `assets/instructions/architecture.instructions.md`
     goes to `.github/instructions/` **only if that file does not already exist**.
3. Never overwrite an existing `.github/agents/*.agent.md` or a non-placeholder
   `.github/instructions/architecture.instructions.md` without the `force` argument. List skipped files.
4. Check whether an MCP server named `atlassian-mcp` is configured (e.g. `.vscode/mcp.json`). If
   not, tell the user the Spec Generation agent still works, but they'll need to paste Jira/Confluence
   content by hand.
5. Report the copied/skipped files as a table, then give the next steps:
   1. Select **Architecture Discovery** in the Copilot Chat agent picker and send `full`.
   2. Run `/speckit-constitution` so the UST brownfield constitution is grounded in the new
      architecture context.
   3. Use **Spec Generation & Enrichment** → `/speckit-specify` → `/speckit-plan` → `/speckit-tasks`
      → **Developer** (or `/speckit-implement`).
