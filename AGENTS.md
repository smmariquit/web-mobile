# Web & Mobile Portfolio — Agent Guide

Portfolio site at [web.stimmie.dev](https://web.stimmie.dev). Nuxt 3 + Nitro on Vercel.

## How to work

- **Bias toward action.** Implement scoped requests in one pass; ask only when blocked on product calls or secrets.
- **Keep scope tight.** No opportunistic refactors outside the request.
- **No AI-slop copy.** Write like Stimmie: direct, specific, references real projects. Avoid generic marketing filler.
- **Calm UI.** No decorative pulsing dots, blinking badges, or attention-seeking motion. Animate only for real state (e.g. form submitted).
- **Commit when done** unless the user says not to. Conventional Commits. Do not push unless asked.

## Architecture

- **App:** Nuxt 3, Vue 3, Nitro server routes under `server/api/`.
- **Data:** Static portfolio projects in `server/api/projects.get.ts`. Live GitHub stats/stack from `server/api/github-stats.get.ts` and `server/api/stack.get.ts` (cached 1h, SWR).
- **Tech logos:** Official SVGs in `public/tech/` from [Simple Icons](https://simpleicons.org). Re-download with `bash scripts/download-tech-logos.sh` — do not hand-draw SVGs.
- **Stack detection:** `server/utils/tech-stack.ts` maps repo topics/languages to web/mobile/platform tech with repo counts.
- **Analytics:** `@vercel/analytics/nuxt` on deployed Vercel project.

## Env

| Variable       | Required | Purpose                                      |
| -------------- | -------- | -------------------------------------------- |
| `GITHUB_TOKEN` | Optional | Higher GitHub API rate limits for live stats |

Without a token, unauthenticated GitHub API limits apply (usually fine for cached hourly fetches).

## Verify before done

| Step              | When                          |
| ----------------- | ----------------------------- |
| `npm run build`   | Substantive changes           |
| Hit `/api/github-stats` locally | After GitHub API changes |
| Re-run logo script | After adding tech icons      |

## README sync

Update `README.md` in the same change when you touch scripts, env vars, deployment, or stack/API behavior.

## UI guardrails

- Layout must not overflow at 320px and 768px.
- Truncate long text with ellipsis instead of collision.
- Hero stats and stack counts must come from GitHub APIs, not hardcoded marketing numbers.
