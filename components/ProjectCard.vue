<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="project-card card" :style="cardStyle">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="tag tag--accent">{{ categoryLabel }}</span>
        <span class="project-card__year mono">{{ project.year }}</span>
      </div>
      <div class="project-card__indicator" :style="{ background: project.color }"></div>
    </div>

    <h3 class="heading-md project-card__title">{{ project.title }}</h3>
    <p class="project-card__subtitle">{{ project.subtitle }}</p>
    <p class="body project-card__desc">{{ project.description }}</p>

    <div class="project-card__footer">
      <div class="project-card__stack">
        <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
      </div>
      <span class="project-card__impact mono">{{ project.impact }}</span>
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
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--card-accent, var(--c-accent));
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.project-card:hover::before {
  opacity: 1;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.project-card__year {
  font-size: 0.75rem;
  color: var(--c-text-tertiary);
}

.project-card__indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.6;
}

.project-card__title {
  color: var(--c-text-primary);
  transition: color var(--duration-fast);
}

.project-card:hover .project-card__title {
  color: var(--c-accent);
}

.project-card__subtitle {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--c-text-tertiary);
  margin-top: calc(-1 * var(--sp-2));
}

.project-card__desc {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__footer {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-top: auto;
  padding-top: var(--sp-4);
  border-top: 1px solid var(--c-border);
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.project-card__impact {
  font-size: 0.6875rem;
  color: var(--c-text-tertiary);
}
</style>
