# UST Brownfield SDD (preset)

Replaces Spec Kit's blank `constitution-template.md` with the brownfield-safe constitution first
written for observex-ui, made stack-agnostic, and wraps `/speckit-constitution` so the agent
fills the placeholders from the target repo (and from `.github/instructions/architecture.instructions.md`
when the `ust-sdd-agents` extension has produced it).

Install: `specify preset add ust-brownfield-sdd` (from a catalog) or `specify preset add --dev ./presets/ust-brownfield-sdd`.

After install run `/speckit-constitution` in Copilot Chat.
