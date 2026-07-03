/**
 * Talks synced from https://github.com/smmariquit/stimmie.dev/blob/main/src/data/talks.js
 * Full listing: https://stimmie.dev/talks
 */

export interface TalkEntry {
  slug: string
  title: string
  type: 'Talk' | 'Workshop'
  event: string
  date: string | null
  year: number | null
  audienceSize: number
  url: string
}

export const TALKS: TalkEntry[] = [
  {
    "slug": "dsg-codeit-day1-what-is-data-science",
    "title": "What is Data Science?",
    "type": "Workshop",
    "event": "UPLB Data Science Guild x UPRHS CodeIT",
    "date": "2025-04-04T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 40,
    "url": "https://stimmie.dev/talks/dsg-codeit-day1-what-is-data-science"
  },
  {
    "slug": "dsg-codeit-day2-storytelling-with-data",
    "title": "Storytelling with Data",
    "type": "Workshop",
    "event": "UPLB Data Science Guild x UPRHS CodeIT",
    "date": "2025-04-11T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 40,
    "url": "https://stimmie.dev/talks/dsg-codeit-day2-storytelling-with-data"
  },
  {
    "slug": "nextstep-hacks-2025-winning-by-talking",
    "title": "Winning by Talking",
    "type": "Talk",
    "event": "NextStep Hacks 2025",
    "date": "2025-07-12T14:00:00+08:00",
    "year": 2025,
    "audienceSize": 100,
    "url": "https://stimmie.dev/talks/nextstep-hacks-2025-winning-by-talking"
  },
  {
    "slug": "jpcs-qcu-logic-unlocked-ml-with-python",
    "title": "Machine Learning with Python",
    "type": "Workshop",
    "event": "JPCS QCU Logic Unlocked",
    "date": "2025-09-25T09:00:00+08:00",
    "year": 2025,
    "audienceSize": 60,
    "url": "https://stimmie.dev/talks/jpcs-qcu-logic-unlocked-ml-with-python"
  },
  {
    "slug": "dsg-applicants-data-storytelling-canva",
    "title": "Data Storytelling with Canva",
    "type": "Workshop",
    "event": "UPLB Data Science Guild",
    "date": "2025-10-05T13:00:00+08:00",
    "year": 2025,
    "audienceSize": 60,
    "url": "https://stimmie.dev/talks/dsg-applicants-data-storytelling-canva"
  },
  {
    "slug": "dep-ai-use-cases-that-actually-matter",
    "title": "AI Use Cases That Actually Matter",
    "type": "Talk",
    "event": "Data Engineering Pilipinas",
    "date": "2025-10-12T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 150,
    "url": "https://stimmie.dev/talks/dep-ai-use-cases-that-actually-matter"
  },
  {
    "slug": "dlsu-eces-agile-edge-swift-project-workflows",
    "title": "Agile Edge: Swift Project Workflows",
    "type": "Talk",
    "event": "DLSU ECES",
    "date": "2025-11-05T14:00:00+08:00",
    "year": 2025,
    "audienceSize": 80,
    "url": "https://stimmie.dev/talks/dlsu-eces-agile-edge-swift-project-workflows"
  },
  {
    "slug": "ml-iris-classification-org-applicants",
    "title": "ML Workshop: Iris Classification",
    "type": "Workshop",
    "event": "UPLB Data Science Guild Apps' Workshop",
    "date": "2026-03-02T10:00:00+08:00",
    "year": 2026,
    "audienceSize": 12,
    "url": "https://stimmie.dev/talks/ml-iris-classification-org-applicants"
  },
  {
    "slug": "python-in-research-ust",
    "title": "Python in Research",
    "type": "Talk",
    "event": "Decode to Defend: A Research Refresher by UST Computer Science Society",
    "date": "2026-04-24T13:30:00+08:00",
    "year": 2026,
    "audienceSize": 70,
    "url": "https://stimmie.dev/talks/python-in-research-ust"
  },
  {
    "slug": "ml-workshop-smcl",
    "title": "Machine Learning Workshop",
    "type": "Workshop",
    "event": "Saint Michael's College of Laguna",
    "date": "2026-02-19T09:00:00+08:00",
    "year": 2026,
    "audienceSize": 40,
    "url": "https://stimmie.dev/talks/ml-workshop-smcl"
  },
  {
    "slug": "hearthcraft-40000-player-minecraft-server",
    "title": "HearthCraft: A 40,000-Player Minecraft Server",
    "type": "Talk",
    "event": "HearthCraft",
    "date": "2026-02-02T10:00:00+08:00",
    "year": 2026,
    "audienceSize": 100,
    "url": "https://stimmie.dev/talks/hearthcraft-40000-player-minecraft-server"
  },
  {
    "slug": "present-insights-better-batangas-eastern-colleges",
    "title": "Present Insights Better",
    "type": "Talk",
    "event": "Batangas Eastern Colleges",
    "date": "2026-02-12T10:00:00+08:00",
    "year": 2026,
    "audienceSize": 60,
    "url": "https://stimmie.dev/talks/present-insights-better-batangas-eastern-colleges"
  },
  {
    "slug": "hosting-a-minecraft-server-cdm",
    "title": "Hosting a Minecraft Server",
    "type": "Talk",
    "event": "Colegio de Muntinlupa",
    "date": "2026-03-03T10:00:00+08:00",
    "year": 2026,
    "audienceSize": 40,
    "url": "https://stimmie.dev/talks/hosting-a-minecraft-server-cdm"
  },
  {
    "slug": "networking-resume-personal-branding-uplb-2025",
    "title": "Networking, Resume, & Personal Branding 101",
    "type": "Talk",
    "event": "UPLB Batch 2025 Discord Server",
    "date": "2025-07-13T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 50,
    "url": "https://stimmie.dev/talks/networking-resume-personal-branding-uplb-2025"
  },
  {
    "slug": "i-love-and-hate-the-tech-industry-uplb-2025",
    "title": "I Love and Hate the Tech Industry",
    "type": "Talk",
    "event": "UPLB Batch 2025 Discord Server",
    "date": "2025-07-07T21:00:00+08:00",
    "year": 2025,
    "audienceSize": 50,
    "url": "https://stimmie.dev/talks/i-love-and-hate-the-tech-industry-uplb-2025"
  },
  {
    "slug": "navigating-hackathons-bulsu-css",
    "title": "Navigating Hackathons",
    "type": "Talk",
    "event": "Bulacan State University Computer Science Society",
    "date": "2025-12-12T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 60,
    "url": "https://stimmie.dev/talks/navigating-hackathons-bulsu-css"
  },
  {
    "slug": "minecraft-moments-milestones-eheads-21",
    "title": "Minecraft, Moments, Milestones",
    "type": "Talk",
    "event": "eHeads 21 @ Arthaland Century Pacific Tower",
    "date": "2025-12-12T10:00:00+08:00",
    "year": 2025,
    "audienceSize": 80,
    "url": "https://stimmie.dev/talks/minecraft-moments-milestones-eheads-21"
  },
  {
    "slug": "cmsc-21-mock-review-uplb-ics-discord",
    "title": "CMSC 21 Mock Review",
    "type": "Workshop",
    "date": null,
    "year": null,
    "audienceSize": 50,
    "url": "https://stimmie.dev/talks/cmsc-21-mock-review-uplb-ics-discord"
  }
]

export function getTotalAudience() {
  return TALKS.reduce((sum, talk) => sum + talk.audienceSize, 0)
}

export function getFeaturedTalks(limit = 6) {
  return [...TALKS]
    .sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0
      const db = b.date ? Date.parse(b.date) : 0
      return db - da
    })
    .slice(0, limit)
}
