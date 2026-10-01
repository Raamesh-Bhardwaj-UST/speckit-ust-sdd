#!/usr/bin/env pwsh
# Copies the UST SDD custom Copilot agents into .github/agents and seeds the
# architecture-context placeholder. Never overwrites existing files unless -Force.
[CmdletBinding()]
param([switch]$Force)

$ErrorActionPreference = 'Stop'
$repoRoot = (git rev-parse --show-toplevel 2>$null)
if (-not $repoRoot) { $repoRoot = (Get-Location).Path }
$extRoot = Join-Path $repoRoot '.specify/extensions/ust-sdd-agents'
if (-not (Test-Path $extRoot)) { throw "Extension not installed at $extRoot" }

$map = @(
  @{ Src = 'assets/agents'; Dst = '.github/agents' },
  @{ Src = 'assets/instructions'; Dst = '.github/instructions' }
)
$result = @()
foreach ($m in $map) {
  $dst = Join-Path $repoRoot $m.Dst
  New-Item -ItemType Directory -Force -Path $dst | Out-Null
  Get-ChildItem -File (Join-Path $extRoot $m.Src) | ForEach-Object {
    $target = Join-Path $dst $_.Name
    if ((Test-Path $target) -and -not $Force) {
      $result += [pscustomobject]@{ File = "$($m.Dst)/$($_.Name)"; Action = 'skipped (exists)' }
    } else {
      Copy-Item $_.FullName $target -Force
      $result += [pscustomobject]@{ File = "$($m.Dst)/$($_.Name)"; Action = 'copied' }
    }
  }
}
$result | ConvertTo-Json -Compress
