<template>
  <section class="featured-work" aria-labelledby="featured-title">
    <div class="featured-work__head">
      <h2 id="featured-title" class="title-lg">Selected projects</h2>
      <NuxtLink to="/projects" class="btn btn--line btn--sm">View all</NuxtLink>
    </div>

    <ul class="featured-work__list divide-rows divide-rows--lg">
      <li v-for="project in projects" :key="project.slug" class="featured-work__item">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="featured-work__link"
          :class="{ 'featured-work__link--phone': isPhonePreview(project) }"
        >
          <div
            class="featured-work__media"
            :class="{
              'featured-work__media--device': isHardwarePreview(project),
              'featured-work__media--phone': isPhonePreview(project),
              'featured-work__media--app': project.category === 'web',
            }"
          >
            <ProjectPreviewImage
              :previews="project.previews"
              :fallback="project.images?.[0]"
              :alt="project.title"
              :fallback-color="project.color"
              :mobile-first="project.category === 'mobile' && !project.previews?.desktop"
            />
          </div>
          <div class="featured-work__body">
            <p class="featured-work__meta caption">
              {{ categoryLabel(project.category) }} · {{ project.year }}
            </p>
            <h3 class="title-md">{{ project.title }}</h3>
            <p class="body-sm">{{ project.subtitle }}</p>
            <p class="featured-work__desc body-sm">{{ project.description }}</p>
            <span class="featured-work__more text-link">View case study</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  year: number
  color: string
  previews?: { desktop?: string; tablet?: string; mobile?: string }
  images?: string[]
}

defineProps<{
  projects: Project[]
}>()

function categoryLabel(category: string) {
  const map: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    extension: 'Extension',
  }
  return map[category] ?? category
}

function isHardwarePreview(project: Project) {
  return project.slug === 'bus-ticketing-app'
}

function isPhonePreview(project: Project) {
  return project.category === 'mobile' && !project.previews?.desktop && !isHardwarePreview(project)
}
</script>

<style scoped>
.featured-work__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: var(--space-row);
}

.featured-work__link {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(1rem, 3vw, 2rem);
  align-items: start;
  color: inherit;
  border-radius: var(--r-md);
}

.featured-work__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.featured-work__link:hover .featured-work__more {
  color: var(--accent-hover);
}

.featured-work__media {
  overflow: hidden;
  border-radius: var(--r-md);
  border: 1px solid var(--c-line-strong);
  background: var(--c-surface);
}

.featured-work__media :deep(.preview-image),
.featured-work__media :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

.featured-work__media--phone {
  background: #0a0a0c;
}

.featured-work__media--phone :deep(img) {
  object-fit: contain;
  object-position: top center;
}

.featured-work__link--phone {
  grid-template-columns: minmax(0, 1fr) clamp(13rem, 22vw, 17.5rem);
  align-items: center;
}

.featured-work__link--phone .featured-work__body {
  order: 1;
}

.featured-work__link--phone .featured-work__media {
  order: 2;
  justify-self: end;
  width: 100%;
}

.featured-work__link--phone .featured-work__media--phone {
  max-width: none;
}

.featured-work__media--device {
  background: var(--bg-primary);
}

.featured-work__media--app {
  background: #fff;
}

.featured-work__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.featured-work__meta {
  color: var(--c-text-soft);
}

.featured-work__desc {
  margin-top: 0.35rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-work__more {
  margin-top: 0.65rem;
  font-size: var(--fs-caption);
}

@media (max-width: 768px) {
  .featured-work__link {
    grid-template-columns: 1fr;
  }

  .featured-work__link--phone .featured-work__body,
  .featured-work__link--phone .featured-work__media {
    order: unset;
  }

  .featured-work__link--phone .featured-work__media {
    justify-self: center;
    max-width: min(15rem, 78vw);
  }
}
</style>
