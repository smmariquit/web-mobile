# web.stimmie.dev — Web & Mobile Portfolio

Nuxt 3 portfolio for freelance web and mobile work. Live GitHub stats and a tech stack grid derived from public repos.

**Live:** [web.stimmie.dev](https://web.stimmie.dev)

## Stack

- Nuxt 3 + Vue 3 + Nitro
- Vercel Analytics
- GitHub REST API (cached server routes)

## Setup

```bash
npm install
cp .env.example .env   # optional: GITHUB_TOKEN for higher API limits
npm run dev            # http://localhost:3000
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `bash scripts/download-tech-logos.sh` | Refresh brand SVGs in `public/tech/` |

## API routes

| Route | Description |
| ----- | ----------- |
| `GET /api/projects` | Static featured portfolio projects |
| `GET /api/github-stats` | Live public repos, stars, followers (1h cache) |
| `GET /api/stack` | Web/mobile tech detected from GitHub repos |
| `GET /api/skills` | Skills grouped by category with repo counts |
| `POST /api/contact` | Contact form handler |

## Tech logos

Icons are downloaded from [Simple Icons](https://simpleicons.org) (official brand SVGs), stored in `public/tech/`. Nuxt slug uses a devicon fallback. Do not commit hand-drawn SVGs.

## Agent notes

See [AGENTS.md](./AGENTS.md) for coding conventions and UI guardrails.

---
*Part of the [stimmie.dev](https://stimmie.dev) ecosystem.*
