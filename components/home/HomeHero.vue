<template>
  <header class="home-hero">
    <div class="home-hero__copy">
      <div class="home-hero__intro">
        <ProfileAvatar size="md" :linked="false" alt="Simonee Mariquit" class="home-hero__avatar" />
        <p class="kicker home-hero__kicker">Freelance web and mobile</p>
      </div>

      <h1 class="home-hero__title">{{ title }}</h1>
      <p v-if="lede" class="home-hero__dek">{{ lede }}</p>

      <p v-if="credibility || showStatsLink" class="home-hero__cred caption">
        <a
          v-if="githubUrl && credibility"
          :href="githubUrl"
          target="_blank"
          rel="noopener"
        >{{ credibility }}</a>
        <template v-else-if="credibility">{{ credibility }}</template>
        <template v-if="showStatsLink">
          <span v-if="credibility" aria-hidden="true"> · </span>
          <NuxtLink to="/stats" class="home-hero__stats">Live traffic</NuxtLink>
        </template>
      </p>

      <div class="home-hero__actions">
        <div class="btn-row">
          <NuxtLink to="/contact" class="btn btn--solid">Send brief</NuxtLink>
          <a href="https://cal.com/simonee" target="_blank" rel="noopener" class="btn btn--line">Book a call</a>
        </div>
        <NuxtLink to="/hire" class="home-hero__rates caption">See rates</NuxtLink>
      </div>
    </div>

    <NuxtLink
      v-if="heroProject"
      :to="`/projects/${heroProject.slug}`"
      class="home-hero__spotlight"
    >
      <ProjectPreviewImage
        :previews="heroProject.previews"
        :fallback="heroProject.images?.[0]"
        :alt="`${heroProject.title} preview`"
        :fallback-color="heroProject.color"
      />
      <span class="home-hero__spotlight-cap">
        <span class="title-sm home-hero__spotlight-title">{{ heroProject.title }}</span>
        <span class="caption">{{ heroProject.subtitle }}</span>
        <span class="home-hero__spotlight-more caption">View case study →</span>
      </span>
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  lede?: string
  credibility?: string
  githubUrl?: string
  heroProject?: {
    slug: string
    title: string
    subtitle: string
    color: string
    previews?: { desktop?: string; mobile?: string }
    images?: string[]
  } | null
  showStatsLink?: boolean
}>()
</script>

<style scoped>
.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.home-hero__intro {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.home-hero__avatar {
  flex-shrink: 0;
}

.home-hero__kicker {
  margin: 0;
}

.home-hero__title {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  font-variation-settings: 'SOFT' 40, 'WONK' 0;
  font-size: clamp(1.85rem, 1.35rem + 2.2vw, 3rem);
  font-weight: 540;
  line-height: 1.08;
  letter-spacing: -0.01em;
  max-width: 16ch;
}

.home-hero__dek {
  margin-top: 0.65rem;
  font-size: var(--fs-body);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 34ch;
}

.home-hero__cred {
  margin-top: 0.75rem;
}

.home-hero__cred a,
.home-hero__stats {
  color: var(--c-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.home-hero__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  margin-top: 1rem;
}

.home-hero__rates {
  color: var(--text-muted);
}

.home-hero__rates:hover {
  color: var(--c-accent);
}

.home-hero__spotlight {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: inherit;
  text-decoration: none;
}

.home-hero__spotlight:hover .home-hero__spotlight-title,
.home-hero__spotlight:hover .home-hero__spotlight-more {
  color: var(--c-accent);
}

.home-hero__spotlight :deep(.preview-image),
.home-hero__spotlight :deep(img) {
  width: 100%;
  border: 1px solid var(--c-line-strong);
  border-radius: var(--r-md);
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  transition: border-color 0.15s var(--ease);
}

.home-hero__spotlight:hover :deep(.preview-image),
.home-hero__spotlight:hover :deep(img) {
  border-color: var(--c-accent);
}

.home-hero__spotlight-cap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.home-hero__spotlight-title {
  transition: color 0.15s var(--ease);
}

.home-hero__spotlight-more {
  margin-top: 0.45rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.15s var(--ease);
}

@media (max-width: 900px) {
  .home-hero {
    grid-template-columns: 1fr;
  }

  .home-hero__title,
  .home-hero__dek {
    max-width: none;
  }
}
</style>
