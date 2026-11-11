#!/usr/bin/env bash
# Build the site for GitHub Pages and push it to the gh-pages branch.
# Usage: npm run deploy:pages
#
# One-time setup on GitHub: Settings → Pages → Build and deployment →
# Source: "Deploy from a branch", Branch: gh-pages, folder: / (root).
#
# The preview is published at https://<owner>.github.io/<repo>/ and is hidden
# from search engines. It deploys your working copy, including uncommitted
# changes. Delete this script once the site moves to Cloudflare.
set -euo pipefail

cd "$(dirname "$0")/.."
remote="$(git remote get-url origin)"

# Work out owner and repo from either git@github.com:owner/repo.git or https://github.com/owner/repo.git
path="${remote#*github.com[:/]}"
path="${path%.git}"
owner="${path%%/*}"
repo="${path#*/}"
commit="$(git rev-parse --short HEAD)"

echo "Checking content…"
npm run --silent check

echo "Building for https://${owner}.github.io/${repo}/ …"
SITE="https://${owner}.github.io" BASE_PATH="/${repo}" NOINDEX=true npm run --silent build

# Publish dist/ as the only commit on gh-pages (history isn't needed for a build).
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
cp -R dist/. "$tmp"
touch "$tmp/.nojekyll"
git -C "$tmp" init -q -b gh-pages
git -C "$tmp" add -A
git -C "$tmp" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" \
  commit -q -m "Deploy preview from ${commit}"
git -C "$tmp" push -q -f "$remote" gh-pages

echo "Pushed to gh-pages. Live in a minute or two at https://${owner}.github.io/${repo}/"
echo "(dist/ now holds the preview build; run npm run build to rebuild for the real site.)"
