# UST SDD Custom Agents (extension)

Stack-agnostic versions of the three Copilot custom agents first built for observex-ui:

| Agent | Writes to | Purpose |
|---|---|---|
| Architecture Discovery | `.github/instructions/architecture.instructions.md` | Evidence-based architecture map used as context by every other step |
| Spec Generation & Enrichment | `docs/specs/*.md` | Turns a Jira key / Confluence page / idea into an implementation-ready spec |
| Developer | app code + tests | Implements a spec or `tasks.md` with test-first, lint/test/build verification |

Spec Kit extensions can't place files outside `.specify/`, so after install run
`/speckit-ust-sdd-agents-setup` in Copilot Chat (or `pwsh .specify/extensions/ust-sdd-agents/scripts/powershell/install-agents.ps1`).
Existing files are never overwritten unless you pass `force` / `-Force`.

Optional: an `atlassian-mcp` MCP server for Jira/Confluence input.
