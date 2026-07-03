<template>
  <section class="featured-work" aria-labelledby="featured-title">
    <div class="featured-work__head">
      <h2 id="featured-title" class="title-lg">Selected projects</h2>
      <NuxtLink to="/projects" class="featured-work__all caption">View all</NuxtLink>
    </div>

    <ul class="featured-work__list">
      <li v-for="project in projects" :key="project.slug" class="featured-work__item">
        <NuxtLink :to="`/projects/${project.slug}`" class="featured-work__link">
          <div
            class="featured-work__media"
            :class="{
              'featured-work__media--device': isDevicePreview(project),
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
            <span class="featured-work__more">View case study</span>
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

function isDevicePreview(project: Project) {
  return project.category === 'mobile' && !project.previews?.desktop
}
</script>

<style scoped>
.featured-work__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.featured-work__all {
  color: var(--c-accent);
}

.featured-work__all:hover {
  text-decoration: underline;
}

.featured-work__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--c-line);
}

.featured-work__item {
  border-bottom: 1px solid var(--c-line);
}

.featured-work__link {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(1rem, 3vw, 2rem);
  padding: 1.5rem 0;
  color: inherit;
}

.featured-work__link:hover .featured-work__more {
  color: var(--c-accent);
}

.featured-work__media {
  overflow: hidden;
  border-radius: var(--r-md);
  border: 1px solid var(--c-line-strong);
  background: var(--c-surface);
}

.featured-work__media :deep(.preview-image),
.featured-work__media :deep(img) {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
}

.featured-work__media--device {
  background: var(--bg-primary);
}

.featured-work__media--device :deep(.preview-image),
.featured-work__media--device :deep(img) {
  aspect-ratio: auto;
  height: auto;
  max-height: 22rem;
  object-fit: contain;
  object-position: center;
  background: var(--bg-primary);
}

.featured-work__media--app :deep(.preview-image),
.featured-work__media--app :deep(img) {
  aspect-ratio: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  background: #fff;
}

.featured-work__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: center;
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
  font-weight: 600;
  color: var(--c-text);
}

@media (max-width: 768px) {
  .featured-work__link {
    grid-template-columns: 1fr;
  }
}
</style>
