// server/api/projects.get.ts

/**
 * GET /api/projects
 * Returns all portfolio projects from the Nitro server layer.
 * This is the "new backend" — project data served via Nuxt's Nitro engine.
 */
export default defineEventHandler(() => {
  return [
    {
      slug: 'room-tba',
      title: 'Room TBA',
      subtitle: 'Campus Room & Class Finder',
      category: 'web',
      year: 2024,
      featured: true,
      description:
        'A SvelteKit progressive web app that helps UPLB students locate classes and rooms across campus. Features advanced filters, schedules, interactive building info, OpenStreetMap directions, and full offline support.',
      impact: '13 stars · Used by UPLB students daily',
      stack: ['SvelteKit', 'TypeScript', 'OpenStreetMap', 'PWA'],
      links: {
        live: 'https://room-tba.stimmie.dev',
        github: 'https://github.com/smmariquit/room-tba',
      },
      images: [
        '/projects/room-tba-1.jpg',
        '/projects/room-tba-2.jpg',
        '/projects/room-tba-3.jpg',
      ],
      color: '#3ecfb0',
    },
    {
      slug: 'gradesim',
      title: 'Elbi GradeSim',
      subtitle: 'Grade Simulator & Forecaster',
      category: 'extension',
      year: 2025,
      featured: true,
      description:
        'A cross-browser extension that simulates and forecasts course grades from quizzes, exams, and weighted components. Supports the University of the Philippines grading system with semantic-release versioning and a standalone landing page.',
      impact: 'Published on Chrome & Firefox · Semantic-release CI/CD',
      stack: ['JavaScript', 'Browser Extension', 'Vercel', 'GitHub Actions'],
      links: {
        live: 'https://gradesim-five.vercel.app',
        github: 'https://github.com/smmariquit/gradesim',
      },
      images: [
        '/projects/gradesim-1.jpg',
        '/projects/gradesim-2.jpg',
        '/projects/gradesim-3.jpg',
      ],
      color: '#5b8def',
    },
    {
      slug: 'bus-ticketing-app',
      title: 'Bus Ticketing System',
      subtitle: 'POS Terminal App with Hardware Integration',
      category: 'mobile',
      year: 2024,
      featured: true,
      description:
        'A React Native + TypeScript mobile application designed for POS machines used in bus ticketing. Includes hardware device integration, comprehensive Jest test suites, and a GitHub Actions pipeline that builds production Android APKs automatically.',
      impact: 'Hardware-integrated · Automated APK builds',
      stack: ['React Native', 'TypeScript', 'Jest', 'GitHub Actions'],
      links: {
        github: 'https://github.com/smmariquit/bus-ticketing-app',
      },
      images: [],
      color: '#e86a7e',
    },
    {
      slug: 'hearthcraft',
      title: 'HearthCraft',
      subtitle: 'Minecraft Server Infrastructure',
      category: 'web',
      year: 2018,
      featured: true,
      description:
        'A survival Minecraft server I founded at age 13 — managed bare-metal and cloud servers, configured Java plugins, Docker containers, and built a multiplayer community that served as a safe space for 10,000+ players over 6 years, including through the pandemic.',
      impact: '10,000+ players · 6 years running',
      stack: ['Java', 'Docker', 'Spigot/Paper', 'Linux'],
      links: {
        live: 'https://hearthcraft.stimmie.dev',
        github: 'https://github.com/smmariquit/hearthcraft-museum',
      },
      images: [
        '/projects/hearthcraft-1.jpg',
        '/projects/hearthcraft-2.jpg',
        '/projects/hearthcraft-3.jpg',
      ],
      color: '#e8a946',
    },
    {
      slug: 'atlas-of-my-skies',
      title: 'Atlas of My Skies',
      subtitle: 'Astronomy Photo Diary',
      category: 'web',
      year: 2024,
      featured: true,
      description:
        'A Next.js astronomy diary that maps the sky above me each day — a quiet, meditative web project blending photography with technology. Built with TypeScript and deployed on Vercel.',
      impact: 'Personal project · Photography × code',
      stack: ['Next.js', 'TypeScript', 'Vercel'],
      links: {
        live: 'https://atlas-of-my-skies.vercel.app',
        github: 'https://github.com/smmariquit/atlas-of-my-skies',
      },
      images: [
        '/projects/atlas-of-my-skies-1.jpg',
        '/projects/atlas-of-my-skies-2.jpg',
        '/projects/atlas-of-my-skies-3.jpg',
      ],
      color: '#9678f0',
    },
  ]
})
