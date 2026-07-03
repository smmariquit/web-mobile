#!/usr/bin/env bash
# Download official brand SVGs from Simple Icons (https://simpleicons.org).
# Run after adding a new slug in server/utils/tech-stack.ts.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/tech"
mkdir -p "$OUT"

SLUGS=(
  typescript javascript nextdotjs react vuedotjs nuxtdotjs svelte astro
  tailwindcss vite supabase vercel googlecloud cloudflare flutter dart expo firebase swift kotlin
  nodedotjs python postgresql docker github linkedin figma discord openstreetmap
)

for slug in "${SLUGS[@]}"; do
  if [[ "$slug" == "github" || "$slug" == "linkedin" ]]; then
    curl -sfL "https://cdn.simpleicons.org/github/white" -o "$OUT/${slug}.svg"
    echo "ok ${slug} (white)"
  elif curl -sfL "https://cdn.simpleicons.org/${slug}" -o "$OUT/${slug}.svg"; then
    echo "ok ${slug}"
  elif [[ "$slug" == "nuxtdotjs" ]]; then
    curl -sfL "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg" \
      -o "$OUT/${slug}.svg"
    echo "ok ${slug} (devicon fallback)"
  else
    echo "fail ${slug}" >&2
    exit 1
  fi
done

curl -sfL "https://cdn.simpleicons.org/googlechrome" -o "$OUT/pwa.svg"
echo "ok pwa"
