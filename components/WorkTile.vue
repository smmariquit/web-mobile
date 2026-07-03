<template>
  <article
    class="work-tile"
    :class="[
      `work-tile--${variant}`,
      {
        'work-tile--device': isHardwarePreview,
        'work-tile--phone': isPhonePreview,
        'work-tile--app': project.category === 'web',
      },
    ]"
  >
    <div class="work-tile__group">
      <NuxtLink :to="`/projects/${project.slug}`" class="work-tile__link">
        <div class="work-tile__media">
          <ProjectPreviewImage
            :previews="project.previews"
            :fallback="project.images?.[0]"
            :alt="project.title"
            :fallback-color="project.color"
            :mobile-first="project.category === 'mobile' && !project.previews?.desktop"
          />
        </div>
        <div class="work-tile__body">
          <p class="data-band work-tile__meta">
            <span>{{ categoryLabel }}</span>
            <span>{{ project.year }}</span>
            <span v-if="project.impact">{{ project.impact.split('·')[0]?.trim() }}</span>
          </p>
          <h3 class="title-md">{{ project.title }}</h3>
          <p class="body-sm">{{ project.subtitle }}</p>
          <p v-if="variant === 'feature'" class="body-sm work-tile__desc measure">{{ project.description }}</p>
        </div>
      </NuxtLink>

      <div
        v-if="project.links?.github || project.links?.live"
        class="work-tile__links data-band"
        :aria-label="`${project.title} external links`"
      >
        <a
          v-if="project.links.live"
          :href="project.links.live"
          target="_blank"
          rel="noopener"
          class="text-link work-tile__ext"
          :aria-label="`${project.title} live site (opens in new tab)`"
          @click.stop
        >
          Live ↗
        </a>
        <a
          v-if="project.links.github"
          :href="project.links.github"
          target="_blank"
          rel="noopener"
          class="text-link work-tile__ext"
          :aria-label="`${project.title} repository (opens in new tab)`"
          @click.stop
        >
          Repo ↗
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface ProjectLinks {
  live?: string
  github?: string
}

interface ProjectPreviews {
  desktop?: string
  tablet?: string
  mobile?: string
}

interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  year: number
  description: string
  impact?: string
  links?: ProjectLinks
  previews?: ProjectPreviews
  images?: string[]
  color: string
}

const props = withDefaults(defineProps<{
  project: Project
  variant?: 'feature' | 'compact'
}>(), {
  variant: 'compact',
})

const categoryLabel = computed(() => {
  const map: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    extension: 'Extension',
  }
  return map[props.project.category] || props.project.category
})

const isHardwarePreview = computed(() => props.project.slug === 'bus-ticketing-app')

const isPhonePreview = computed(
  () =>
    props.project.category === 'mobile'
    && !props.project.previews?.desktop
    && !isHardwarePreview.value,
)
</script>

<style scoped>
.work-tile {
  break-inside: avoid;
}

.work-tile__group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.85rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
  background: var(--bg-surface);
}

.work-tile__link {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: inherit;
  border-radius: var(--r-md);
}

.work-tile__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.work-tile__media {
  overflow: hidden;
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
  background: var(--bg-primary);
}

.work-tile__media :deep(.preview-image),
.work-tile__media :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

.work-tile--compact.work-tile--phone .work-tile__media {
  max-width: 11.5rem;
  background: #0a0a0c;
}

.work-tile--compact.work-tile--phone .work-tile__media :deep(img) {
  object-fit: contain;
  object-position: top center;
}

.work-tile--compact.work-tile--device .work-tile__media {
  background: var(--bg-primary);
}

.work-tile--compact.work-tile--app .work-tile__media {
  background: #fff;
}

.work-tile--feature .work-tile__link {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2rem;
  align-items: start;
}

.work-tile--feature .work-tile__media :deep(img) {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
}

.work-tile--feature.work-tile--device .work-tile__media :deep(img) {
  aspect-ratio: auto;
  height: auto;
  max-height: 22rem;
  object-fit: contain;
  object-position: center;
  background: var(--bg-primary);
}

.work-tile--feature.work-tile--phone .work-tile__media :deep(img) {
  aspect-ratio: auto;
  height: auto;
  object-fit: contain;
  object-position: top center;
  background: #0a0a0c;
}

.work-tile--feature.work-tile--app .work-tile__media :deep(img) {
  aspect-ratio: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  background: #fff;
}

.work-tile__body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.work-tile__meta {
  font-size: var(--fs-meta);
}

.work-tile__desc {
  margin-top: 0.35rem;
}

.work-tile__links {
  padding-top: 0.75rem;
}

@media (max-width: 900px) {
  .work-tile--feature .work-tile__link {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
