<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="project-card" :style="cardStyle">
    <div class="project-card__image-wrapper">
      <img v-if="project.images && project.images.length > 0" :src="project.images[0]" :alt="project.title" class="project-card__image" loading="lazy" />
      <div v-else class="project-card__image-placeholder" :style="{ backgroundColor: project.color }"></div>
      
      <div class="project-card__overlay">
        <span class="project-card__view-text">View Project →</span>
      </div>
    </div>

    <div class="project-card__content">
      <div class="project-card__header">
        <h3 class="heading-md project-card__title">{{ project.title }}</h3>
        <span class="project-card__year mono">{{ project.year }}</span>
      </div>
      <p class="project-card__subtitle">{{ project.subtitle }}</p>
      
      <div class="project-card__meta">
        <span class="project-card__category">{{ categoryLabel }}</span>
        <span class="project-card__indicator" :style="{ background: project.color }"></span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  year: number
  featured: boolean
  description: string
  impact: string
  stack: string[]
  links: Record<string, string>
  images?: string[]
  color: string
}

const props = defineProps<{ project: Project }>()

const categoryLabel = computed(() => {
  const map: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    extension: 'Extension',
  }
  return map[props.project.category] || props.project.category
})

const cardStyle = computed(() => ({
  '--card-accent': props.project.color,
}))
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  border-radius: var(--r-lg);
  transition: transform var(--duration-normal) var(--ease-out);
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-card__image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--r-md);
  overflow: hidden;
  background-color: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.project-card:hover .project-card__image {
  transform: scale(1.05);
}

.project-card__image-placeholder {
  width: 100%;
  height: 100%;
  opacity: 0.2;
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__view-text {
  color: white;
  font-weight: 500;
  padding: var(--sp-2) var(--sp-4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--r-full);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.project-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  padding: 0 var(--sp-1);
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.project-card__title {
  color: var(--c-text-primary);
  transition: color var(--duration-fast);
}

.project-card:hover .project-card__title {
  color: var(--card-accent, var(--c-accent));
}

.project-card__year {
  font-size: 0.75rem;
  color: var(--c-text-tertiary);
}

.project-card__subtitle {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--c-text-secondary);
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
}

.project-card__category {
  font-size: 0.75rem;
  color: var(--c-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-card__indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.8;
}
</style>
