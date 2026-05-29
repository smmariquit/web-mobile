/**
 * GET /api/skills
 * Returns categorized skill data from the Nitro backend.
 */
export default defineEventHandler(() => {
  return {
    categories: [
      {
        name: 'Frontend',
        icon: '◆',
        items: [
          { name: 'Vue / Nuxt', level: 'learning' },
          { name: 'React / Next.js', level: 'proficient' },
          { name: 'Svelte / SvelteKit', level: 'proficient' },
          { name: 'TypeScript', level: 'proficient' },
          { name: 'HTML / CSS', level: 'proficient' },
          { name: 'Astro', level: 'familiar' },
        ],
      },
      {
        name: 'Mobile',
        icon: '◇',
        items: [
          { name: 'Flutter / Dart', level: 'proficient' },
          { name: 'React Native', level: 'proficient' },
          { name: 'PWA', level: 'proficient' },
        ],
      },
      {
        name: 'Backend & Data',
        icon: '▣',
        items: [
          { name: 'Node.js / Express', level: 'proficient' },
          { name: 'Python / FastAPI', level: 'proficient' },
          { name: 'PostgreSQL / MariaDB', level: 'proficient' },
          { name: 'Firebase', level: 'proficient' },
          { name: 'Prisma ORM', level: 'familiar' },
        ],
      },
      {
        name: 'DevOps & Tools',
        icon: '▤',
        items: [
          { name: 'Docker', level: 'proficient' },
          { name: 'GitHub Actions', level: 'proficient' },
          { name: 'Vercel / Netlify', level: 'proficient' },
          { name: 'Linux / Fedora', level: 'proficient' },
          { name: 'Browser Extensions', level: 'proficient' },
        ],
      },
    ],
  }
})
