#!/usr/bin/env python3
"""Package every extension/preset into release zips and regenerate the three catalogs.

Usage (from the repo root):
    python scripts/release.py --tag v1.0.0
    python scripts/release.py --tag v1.0.0 --release-base http://localhost:8765/dist --raw-base http://localhost:8765

Outputs:
    dist/<id>-<version>.zip          upload these to the GitHub release <tag>
    catalogs/extensions.json         commit
    catalogs/presets.json            commit
    catalogs/bundles.json            commit
"""
from __future__ import annotations

import argparse
import hashlib
import json
import zipfile
from datetime import datetime, timezone
from pathlib import Path

import yaml  # ships with specify-cli; otherwise: pip install pyyaml

ROOT = Path(__file__).resolve().parent.parent
OWNER_REPO = "UST-PACE/speckit-ust-sdd"
FIXED_TS = (1980, 1, 1, 0, 0, 0)
SKIP = {".git", "__pycache__", ".DS_Store"}


def zip_dir(src: Path, out: Path) -> str:
    out.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(p for p in src.rglob("*") if p.is_file()):
            if any(part in SKIP for part in f.relative_to(src).parts):
                continue
            info = zipfile.ZipInfo(f.relative_to(src).as_posix(), FIXED_TS)
            info.external_attr = 0o644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            zf.writestr(info, f.read_bytes())
    return hashlib.sha256(out.read_bytes()).hexdigest()


def count(provides: dict, key: str) -> int:
    return len(provides.get(key) or [])


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--tag", required=True, help="Git tag / GitHub release name, e.g. v1.0.0")
    ap.add_argument("--release-base", help="Base URL for zips (default: GitHub release download URL)")
    ap.add_argument("--raw-base", help="Base URL for raw repo files (default: raw.githubusercontent at <tag>)")
    a = ap.parse_args()
    release_base = (a.release_base or f"https://github.com/{OWNER_REPO}/releases/download/{a.tag}").rstrip("/")
    raw_base = (a.raw_base or f"https://raw.githubusercontent.com/{OWNER_REPO}/{a.tag}").rstrip("/")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    repo = f"https://github.com/{OWNER_REPO}"

    for kind, manifest_name, key in (("extensions", "extension.yml", "extension"), ("presets", "preset.yml", "preset")):
        entries = {}
        for d in sorted((ROOT / kind).iterdir()):
            mf = d / manifest_name
            if not mf.exists():
                continue
            data = yaml.safe_load(mf.read_text(encoding="utf-8"))
            meta = data[key]
            zip_name = f"{meta['id']}-{meta['version']}.zip"
            sha = zip_dir(d, ROOT / "dist" / zip_name)
            provides = data.get("provides") or {}
            entries[meta["id"]] = {
                "id": meta["id"],
                "name": meta["name"],
                "version": meta["version"],
                "description": meta["description"],
                "author": meta["author"],
                "license": meta.get("license", "MIT"),
                "repository": meta.get("repository", repo),
                "download_url": f"{release_base}/{zip_name}",
                "sha256": sha,
                "requires": data.get("requires", {}),
                "provides": {k: count(provides, k) for k in ("commands", "templates", "scripts")},
                "tags": data.get("tags", []),
            }
            print(f"{kind[:-1]:9} {zip_name}  sha256={sha[:12]}…")
        (ROOT / "catalogs" / f"{kind}.json").write_text(
            json.dumps({"schema_version": "1.0", "updated_at": now,
                        "catalog_url": f"https://raw.githubusercontent.com/{OWNER_REPO}/main/catalogs/{kind}.json",
                        kind: entries}, indent=2) + "\n", encoding="utf-8")

    bundles = {}
    for mf in sorted((ROOT / "bundles").glob("*/bundle.yml")):
        data = yaml.safe_load(mf.read_text(encoding="utf-8"))
        meta, provides = data["bundle"], data.get("provides") or {}
        rel = mf.relative_to(ROOT).as_posix()
        bundles[meta["id"]] = {
            **{k: meta[k] for k in ("id", "name", "version", "role", "description", "author", "license")},
            "download_url": f"{raw_base}/{rel}",
            "repository": repo,
            "requires": {"speckit_version": data["requires"]["speckit_version"]},
            "provides": {k: count(provides, k) for k in ("extensions", "presets", "steps", "workflows")},
            "tags": data.get("tags", []),
        }
        print(f"bundle    {meta['id']}@{meta['version']} -> {raw_base}/{rel}")
    (ROOT / "catalogs" / "bundles.json").write_text(
        json.dumps({"schema_version": "1.0", "updated_at": now,
                    "catalog_url": f"https://raw.githubusercontent.com/{OWNER_REPO}/main/catalogs/bundles.json",
                    "bundles": bundles}, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
