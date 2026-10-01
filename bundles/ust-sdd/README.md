# ust-sdd bundle

Installs three components through Spec Kit's normal machinery:

| Kind | ID | What it adds |
|---|---|---|
| preset | `ust-brownfield-sdd` | Brownfield constitution template + grounded `/speckit-constitution` |
| extension | `ust-sdd-agents` | `/speckit-ust-sdd-agents-setup`, which installs the 3 custom Copilot agents |
| extension | `dark-mode-standardization` | `/speckit-dark-mode-standardization-seed` |

Integration: GitHub Copilot (PowerShell scripts). Requires Spec Kit >= 1.0.12.

Install: `specify bundle install ust-sdd` (after adding the UST catalogs, see the repository README).
