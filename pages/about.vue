<template>
  <div class="page">
      <header class="page-head about-head">
        <p class="kicker">About</p>
        <div class="page-head__row">
          <h1 class="display">{{ profile?.profile?.name ?? 'Simonee Mariquit' }}</h1>
        </div>

        <div class="about-intro">
          <div class="about-intro__copy">
            <p class="lede measure about-lede">
              {{ profile?.profile?.aboutParagraph1 ?? profile?.profile?.aboutLede }}
            </p>
            <p v-if="profile?.profile?.aboutParagraph2" class="body-sm measure about-bio">
              {{ profile.profile.aboutParagraph2 }}
            </p>
            <p class="body-sm measure about-writing">
              {{ profile?.writing?.summary }}
              <a
                :href="profile?.profile?.personalSiteUrl ?? 'https://stimmie.dev'"
                target="_blank"
                rel="noopener"
                class="text-link"
              >stimmie.dev ↗</a>
            </p>
            <div class="about-links">
              <a :href="profile?.profile?.resumeUrl" target="_blank" rel="noopener" class="btn btn--line btn--sm">Resume</a>
              <a :href="profile?.profile?.linkedinUrl" target="_blank" rel="noopener" class="btn btn--line btn--sm">LinkedIn</a>
              <a
                :href="profile?.profile?.personalSiteUrl ?? 'https://stimmie.dev'"
                target="_blank"
                rel="noopener"
                class="btn btn--line btn--sm"
              >
                stimmie.dev
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="about-flow page-stack">
        <section class="about-stack">
          <StackPanel
            prominent
            :groups="stackGroups"
            :technologies="stack?.technologies ?? []"
          />
        </section>

        <div class="about-grid">
        <section class="about-panel">
          <p class="kicker">Experience</p>
          <ul class="exp-list divide-rows divide-rows--lg">
            <li v-for="exp in profile?.experience ?? []" :key="`${exp.title}-${exp.org}`" class="exp-list__item">
              <p class="mono caption exp-list__period">{{ exp.period }}</p>
              <div class="exp-list__copy">
                <h3 class="title-sm">{{ exp.title }}</h3>
                <a
                  v-if="exp.href"
                  :href="exp.href"
                  target="_blank"
                  rel="noopener"
                  class="body-sm text-link org-link"
                >{{ exp.org }}</a>
                <p v-else class="body-sm org-link">{{ exp.org }}</p>
                <p class="body-sm">{{ exp.description }}</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="about-panel">
          <div class="panel__head talks-head">
            <p class="kicker">Talks</p>
            <a :href="profile?.profile?.talksUrl" target="_blank" rel="noopener" class="btn btn--line btn--sm">
              All {{ talks?.totalAudience?.toLocaleString() }}+ reached ↗
            </a>
          </div>
          <ul class="talk-cards divide-rows divide-rows--lg">
            <li v-for="talk in talks?.featured ?? []" :key="talk.slug">
              <a :href="talk.url" target="_blank" rel="noopener" class="talk-card">
                <div class="talk-card__head">
                  <span class="tag" :class="talk.type === 'Workshop' ? 'tag--workshop' : 'tag--talk'">{{ talk.type }}</span>
                  <span class="caption mono talk-card__meta">
                    {{ talk.year ?? 'n/a' }} · {{ talk.audienceSize }} reached
                  </span>
                </div>
                <h3 class="title-sm talk-card__title">{{ talk.title }}</h3>
                <p class="caption talk-card__event">{{ talk.event }}</p>
              </a>
            </li>
          </ul>
        </section>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: 'About' })

const [{ data: stack }, { data: profile }, { data: talks }] = await Promise.all([
  useFetch('/api/stack'),
  useFetch('/api/profile'),
  useFetch('/api/talks'),
])

const stackGroups = computed(() => stack.value?.groups ?? [])
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.about-intro {
  margin-top: 1.25rem;
}

.about-bio,
.about-writing {
  margin-top: 0.75rem;
}

.about-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.about-panel > .kicker {
  margin-bottom: var(--space-row);
}

.org-link {
  display: block;
  margin: 0.1rem 0 0.25rem;
}

.exp-list__item {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 1rem;
}

.exp-list__period {
  color: var(--text-muted);
}

.talk-card {
  display: block;
  color: inherit;
}

.talk-card:hover .talk-card__title {
  color: var(--accent);
}

.talk-card__head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
}

.talk-card__meta {
  color: var(--text-muted);
}

.talk-card__event {
  margin-top: 0.2rem;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
