<template>
  <div>
    <section class="section">
      <div class="container">
        <FadeIn>
          <div class="about-header">
            <p class="label">About</p>
            <h1 class="heading-xl">
              Simonee Ezekiel
              <span class="hero__accent">Mariquit</span>
            </h1>
            <p class="body-lg about-header__body">
              BS Computer Science at
              <strong>UP Los Baños</strong>. Started running game servers at 13,
              built my own PC at 16, now shipping web apps, mobile apps, Discord bots,
              and browser extensions. I hate LinkedIn but I do reply to email.
            </p>
            <div v-if="stats" class="about-stats">
              <span class="tag">{{ stats.publicRepos }} public repos</span>
              <span class="tag tag--accent">{{ stats.totalStars }} stars</span>
              <span class="tag">{{ stats.followers }} followers</span>
            </div>
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
            <h2 class="heading-md">Stack from GitHub</h2>
            <p class="body" style="margin-bottom: var(--sp-6);">
              Detected across my public repos — not a resume keyword dump.
              Proficiency tags follow repo count.
            </p>
            <TechStack
              v-if="stack?.technologies?.length"
              :technologies="stack.technologies"
              style="margin-bottom: var(--sp-10);"
            />
            <div v-if="skills" class="skills-grid">
              <div
                v-for="cat in skills.categories"
                :key="cat.name"
                class="card skill-card"
              >
                <h3 class="heading-sm skill-card__title">{{ cat.name }}</h3>
                <ul class="skill-list">
                  <li v-for="skill in cat.items" :key="skill.name" class="skill-item">
                    <span class="skill-item__name">
                      <img v-if="skill.icon" :src="skill.icon" alt="" class="skill-item__icon" width="16" height="16" />
                      {{ skill.name }}
                      <span class="mono skill-item__repos">{{ skill.repoCount }} repos</span>
                    </span>
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
            <h2 class="heading-md">Talks &amp; workshops</h2>
            <p class="body" style="margin-bottom: var(--sp-6);">
              7 talks/workshops so far — data science, ML, hackathon pitching, agile workflows.
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

const [{ data: skills }, { data: stack }, { data: stats }] = await Promise.all([
  useFetch('/api/skills'),
  useFetch('/api/stack'),
  useFetch('/api/github-stats'),
])

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
      'Patient booking flows, mobile-responsive UI, internal Discord bots for standups. React/Next.js, form validation, Firebase.',
  },
  {
    title: 'Web admin & developer',
    org: 'Freelance / gaming communities',
    period: '2019 – present',
    description:
      'WordPress forums and storefronts, Tebex payments, Linux VPS ops, SEO, and support for gaming communities.',
  },
  {
    title: 'Founder',
    org: 'HearthCraft Minecraft server',
    period: '2018 – 2024',
    description:
      'Survival server, 10k+ players over six years. Bare-metal and cloud hosts, Docker, Java plugins, moderation.',
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

.about-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-6);
}

.skill-card__title {
  margin-bottom: var(--sp-5);
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
  gap: var(--sp-3);
  font-size: 0.875rem;
  color: var(--c-text-secondary);
}

.skill-item__name {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  min-width: 0;
}

.skill-item__icon {
  flex-shrink: 0;
  object-fit: contain;
}

.skill-item__repos {
  font-size: 0.6875rem;
  color: var(--c-text-tertiary);
}

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
