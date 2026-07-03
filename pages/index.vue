<template>
  <div>
    <!-- Hero -->
    <section class="hero section">
      <div class="container">
        <FadeIn>
          <div class="hero__content">
            <p class="label">Web &amp; Mobile · {{ stats?.login ?? 'smmariquit' }} on GitHub</p>

            <h1 class="heading-xl hero__heading">
              I build for
              <br />
              <span class="hero__accent">phones, browsers, and POS terminals.</span>
            </h1>

            <p class="body-lg hero__body">
              I'm <strong>Stimmie</strong> — UPLB CS student. Built
              <NuxtLink to="/projects/room-tba">Room TBA</NuxtLink>,
              <NuxtLink to="/projects/gradesim">GradeSim</NuxtLink>,
              <NuxtLink to="/projects/bus-ticketing-app">bus ticketing on React Native</NuxtLink>,
              and a Minecraft server that hit 10k players. I write the code, wire the CI,
              and deploy it.
            </p>

            <div class="hero__actions">
              <NuxtLink to="/projects" class="btn btn--primary">
                See projects
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <NuxtLink to="/contact" class="btn btn--outline">
                Hire me
              </NuxtLink>
            </div>

            <div class="hero__stats" aria-label="GitHub stats">
              <div class="hero__stat">
                <span class="hero__stat-value">{{ formatStat(stats?.publicRepos) }}</span>
                <span class="hero__stat-label body">Public repos</span>
              </div>
              <div class="hero__stat">
                <span class="hero__stat-value">{{ formatStat(stats?.totalStars) }}</span>
                <span class="hero__stat-label body">GitHub stars</span>
              </div>
              <div class="hero__stat">
                <span class="hero__stat-value">{{ formatStat(stats?.followers) }}</span>
                <span class="hero__stat-label body">Followers</span>
              </div>
              <div class="hero__stat">
                <span class="hero__stat-value">{{ stats?.yearsOnGitHub ?? '—' }}</span>
                <span class="hero__stat-label body">Years on GitHub</span>
              </div>
            </div>
            <p v-if="stats?.fetchedAt" class="hero__stats-note mono">
              Live from
              <a :href="stats.profileUrl" target="_blank" rel="noopener">github.com/{{ stats.login }}</a>
              · updated {{ formatRelative(stats.fetchedAt) }}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- Stack -->
    <section class="section" id="stack">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">From my repos</p>
            <h2 class="heading-lg">Web &amp; mobile stack</h2>
            <p class="body-lg">
              Pulled from {{ stats?.publicRepos ?? 'my' }} public GitHub repos — frameworks,
              languages, and platforms I actually ship with. Counts are repos where each
              tech shows up.
            </p>
          </div>
        </FadeIn>

        <FadeIn v-if="stack?.technologies?.length">
          <TechStack :technologies="stack.technologies" />
        </FadeIn>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section" id="featured">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">Selected work</p>
            <h2 class="heading-lg">Featured projects</h2>
            <p class="body-lg">
              Campus tools, extensions, mobile POS, and community sites — the stuff
              I'd put in front of a client.
            </p>
          </div>
        </FadeIn>

        <div v-if="featured" class="featured-grid">
          <FadeIn v-for="(project, i) in featured" :key="project.slug">
            <ProjectCard :project="project" :style="{ transitionDelay: `${i * 80}ms` }" />
          </FadeIn>
        </div>

        <FadeIn>
          <div style="text-align: center; margin-top: var(--sp-10);">
            <NuxtLink to="/projects" class="btn btn--outline">
              All projects
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- Services -->
    <section class="section" id="services">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">What I do</p>
            <h2 class="heading-lg">Freelance services</h2>
          </div>
        </FadeIn>

        <div class="services-grid">
          <FadeIn v-for="(service, i) in services" :key="service.title">
            <div class="card service-card" :style="{ transitionDelay: `${i * 80}ms` }">
              <img :src="service.icon" alt="" class="service-card__icon" width="28" height="28" />
              <h3 class="heading-sm">{{ service.title }}</h3>
              <p class="body">{{ service.description }}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="cta">
      <div class="container">
        <FadeIn>
          <div class="cta-card card">
            <p class="label">Need a builder?</p>
            <h2 class="heading-lg">Got a web or mobile project?</h2>
            <p class="body-lg">
              Full product, one feature, or a CI pipeline that actually builds your APK.
              Email me — I reply within a day.
            </p>
            <div class="cta-card__actions">
              <NuxtLink to="/contact" class="btn btn--primary">
                Email me
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <a
                v-if="stats?.profileUrl"
                :href="stats.profileUrl"
                target="_blank"
                rel="noopener"
                class="btn btn--outline"
              >
                {{ stats.publicRepos }} repos on GitHub
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: null })

const [{ data: projects }, { data: stats }, { data: stack }] = await Promise.all([
  useFetch('/api/projects'),
  useFetch('/api/github-stats'),
  useFetch('/api/stack'),
])

const featured = computed(() => projects.value?.filter((p: { featured: boolean }) => p.featured) ?? [])

function formatStat(value?: number) {
  if (value === undefined) return '—'
  return value.toLocaleString('en-US')
}

function formatRelative(iso: string) {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (minutes < 2) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

const services = [
  {
    icon: '/tech/nextdotjs.svg',
    title: 'Web apps',
    description:
      'Next.js, Nuxt, SvelteKit, Astro — landing pages through full-stack apps with Supabase, Postgres, and Vercel deploys.',
  },
  {
    icon: '/tech/flutter.svg',
    title: 'Mobile apps',
    description:
      'Flutter and React Native (Expo). Offline-first, maps, Firebase backends, and hardware hooks for POS or IoT.',
  },
  {
    icon: '/tech/javascript.svg',
    title: 'Browser extensions',
    description:
      'Chrome/Firefox MV3 extensions with semantic-release, store listings, and CI that ships on every merge.',
  },
  {
    icon: '/tech/docker.svg',
    title: 'DevOps & consulting',
    description:
      'GitHub Actions, Docker, Linux VPS work. Code review, architecture calls, and pipelines that build APKs without manual steps.',
  },
]
</script>

<style scoped>
.hero {
  padding-top: var(--sp-24);
  padding-bottom: var(--sp-16);
}

.hero__content {
  max-width: 720px;
}

.hero__heading {
  margin-top: var(--sp-5);
}

.hero__accent {
  background: linear-gradient(135deg, var(--c-accent) 0%, #f0c674 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__body {
  margin-top: var(--sp-6);
  max-width: 580px;
}

.hero__body strong {
  color: var(--c-text-primary);
}

.hero__body a {
  color: var(--c-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.hero__actions {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-8);
  flex-wrap: wrap;
}

.hero__stats {
  display: flex;
  gap: var(--sp-8);
  margin-top: var(--sp-12);
  padding-top: var(--sp-8);
  border-top: 1px solid var(--c-border);
  flex-wrap: wrap;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 88px;
}

.hero__stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--c-text-primary);
}

.hero__stat-label {
  font-size: 0.8125rem;
}

.hero__stats-note {
  margin-top: var(--sp-4);
  font-size: 0.6875rem;
  color: var(--c-text-tertiary);
}

.hero__stats-note a {
  color: var(--c-text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.section-header {
  margin-bottom: var(--sp-10);
}

.section-header .label {
  margin-bottom: var(--sp-3);
}

.section-header .heading-lg {
  margin-bottom: var(--sp-4);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--sp-6);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-6);
}

.service-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.service-card__icon {
  object-fit: contain;
}

.cta-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-16) var(--sp-8);
  background: linear-gradient(
    135deg,
    var(--c-bg-card) 0%,
    rgba(232, 169, 70, 0.04) 100%
  );
}

.cta-card .body-lg {
  max-width: 520px;
}

.cta-card__actions {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero {
    padding-top: var(--sp-16);
  }

  .hero__stats {
    gap: var(--sp-6);
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
