#!/usr/bin/env bash
# Creates a zip archive of the repo excluding node_modules, .git and env files
set -euo pipefail
OUT=project-deploy.zip
echo "Creating $OUT (this may take a few seconds)..."
zip -r "$OUT" . -x "node_modules/*" ".git/*" "*.env*" "project-deploy.zip" "**/dist/*" "**/.cache/*"
echo "Created $OUT at $(pwd)/$OUT"
