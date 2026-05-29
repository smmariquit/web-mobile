<template>
  <div>
    <section class="section">
      <div class="container">
        <FadeIn>
          <div class="about-header">
            <p class="label">About Me</p>
            <h1 class="heading-xl">
              Simonee Ezekiel
              <span class="hero__accent">Mariquit</span>
            </h1>
            <p class="body-lg about-header__body">
              I'm a software engineer and BS student at the
              <strong>University of the Philippines Los Baños</strong>, building
              web and mobile products for real people. I started coding servers
              at 13, built my own PC at 16, and haven't stopped shipping since.
            </p>
          </div>
        </FadeIn>

        <!-- Experience -->
        <FadeIn>
          <div class="about-section">
            <h2 class="heading-md">Experience</h2>
            <div class="timeline">
              <div class="timeline__item" v-for="exp in experience" :key="exp.title">
                <div class="timeline__dot"></div>
                <div class="timeline__content">
                  <div class="timeline__header">
                    <h3 class="heading-sm">{{ exp.title }}</h3>
                    <span class="mono" style="font-size: 0.75rem; color: var(--c-text-tertiary);">{{ exp.period }}</span>
                  </div>
                  <p class="body" style="font-size: 0.875rem;">{{ exp.org }}</p>
                  <p class="body">{{ exp.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <!-- Skills -->
        <FadeIn>
          <div class="about-section">
            <h2 class="heading-md">Technical Skills</h2>
            <TechMarquee style="margin-bottom: var(--sp-10);" />
            <div v-if="skills" class="skills-grid">
              <div
                v-for="cat in skills.categories"
                :key="cat.name"
                class="card skill-card"
              >
                <div class="skill-card__header">
                  <span class="skill-card__icon">{{ cat.icon }}</span>
                  <h3 class="heading-sm">{{ cat.name }}</h3>
                </div>
                <ul class="skill-list">
                  <li v-for="skill in cat.items" :key="skill.name" class="skill-item">
                    <span>{{ skill.name }}</span>
                    <span class="tag" :class="levelClass(skill.level)">{{ skill.level }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <!-- Speaking -->
        <FadeIn>
          <div class="about-section">
            <h2 class="heading-md">Talks &amp; Workshops</h2>
            <p class="body" style="margin-bottom: var(--sp-6);">
              I've given 7+ talks and workshops across universities and tech communities
              on data science, ML, project management, and hackathon strategy.
            </p>
            <div class="talks-grid">
              <div v-for="talk in talks" :key="talk.title" class="card talk-card">
                <div class="talk-card__header">
                  <span class="tag" :class="talk.type === 'Workshop' ? '' : 'tag--accent'">{{ talk.type }}</span>
                  <span class="mono" style="font-size: 0.75rem; color: var(--c-text-tertiary);">{{ talk.year }}</span>
                </div>
                <h3 class="heading-sm">{{ talk.title }}</h3>
                <p class="body" style="font-size: 0.8125rem;">{{ talk.org }}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'About' })

const { data: skills } = await useFetch('/api/skills')

const levelClass = (level: string) => {
  if (level === 'proficient') return 'tag--accent'
  return ''
}

const experience = [
  {
    title: 'Engineering',
    org: 'E-Konsulta Medical Clinic',
    period: 'Apr 2025 – Jan 2026',
    description:
      'Built patient-facing booking systems, mobile-responsive UIs, and internal Discord bots for team coordination. React/Next.js frontend with form validation and real-time features.',
  },
  {
    title: 'Web Administrator & Developer',
    org: 'Freelance / Gaming Communities',
    period: '2019 – Present',
    description:
      'Developed and maintained community forums and storefronts using WordPress. Integrated payment gateways (Tebex), managed Linux VPS deployments, and handled SEO and technical support.',
  },
  {
    title: 'Founder & Lead',
    org: 'HearthCraft Minecraft Server',
    period: '2018 – 2024 · 6 years',
    description:
      'Built and maintained a Minecraft server community of 10,000+ players. Managed bare-metal servers, Docker deployments, Java plugins, and community moderation.',
  },
]

const talks = [
  { type: 'Workshop', year: 2024, title: 'What is Data Science?', org: 'UPLB DSG × UPRHS CodeIT' },
  { type: 'Workshop', year: 2024, title: 'Storytelling with Data', org: 'UPLB DSG × UPRHS CodeIT' },
  { type: 'Workshop', year: 2024, title: 'Data Storytelling with Canva', org: 'UPLB Data Science Guild' },
  { type: 'Talk', year: 2025, title: 'Winning by Talking', org: 'NextStep Hacks 2025' },
  { type: 'Workshop', year: 2025, title: 'Machine Learning with Python', org: 'JPCS QCU Logic Unlocked' },
  { type: 'Talk', year: 2025, title: 'AI Use Cases That Actually Matter', org: 'Data Engineering Pilipinas' },
  { type: 'Talk', year: 2025, title: 'Agile Edge: Swift Project Workflows', org: 'DLSU ECES' },
]
</script>

<style scoped>
.about-header {
  max-width: 640px;
  margin-bottom: var(--sp-16);
}

.about-header__body {
  margin-top: var(--sp-6);
}

.about-header__body strong {
  color: var(--c-text-primary);
}

.hero__accent {
  background: linear-gradient(135deg, var(--c-accent) 0%, #f0c674 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-section {
  margin-bottom: var(--sp-16);
}

.about-section > .heading-md {
  margin-bottom: var(--sp-8);
  padding-bottom: var(--sp-3);
  border-bottom: 1px solid var(--c-border);
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--sp-8);
  padding-left: var(--sp-6);
  border-left: 2px solid var(--c-border);
}

.timeline__item {
  position: relative;
}

.timeline__dot {
  position: absolute;
  left: calc(-1 * var(--sp-6) - 5px);
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-accent);
  border: 2px solid var(--c-bg);
}

.timeline__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--sp-1);
  flex-wrap: wrap;
  gap: var(--sp-3);
}

.timeline__content {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-6);
}

.skill-card__header {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-5);
}

.skill-card__icon {
  color: var(--c-accent);
  font-size: 1.125rem;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--c-text-secondary);
}

/* Talks */
.talks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-4);
}

.talk-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-5) var(--sp-6);
}

.talk-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
