<template>
  <div>
    <section class="section">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">Portfolio</p>
            <h1 class="heading-lg">All Projects</h1>
            <p class="body-lg">
              Web apps, mobile apps, browser extensions, and infrastructure — everything
              I've built across screens.
            </p>
          </div>
        </FadeIn>

        <!-- Filters -->
        <FadeIn>
          <div class="filters">
            <button
              v-for="filter in filters"
              :key="filter.value"
              class="filter-btn"
              :class="{ active: activeFilter === filter.value }"
              @click="activeFilter = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </FadeIn>

        <!-- Project grid -->
        <div v-if="filtered" class="projects-grid">
          <FadeIn v-for="(project, i) in filtered" :key="project.slug">
            <ProjectCard :project="project" :style="{ transitionDelay: `${i * 60}ms` }" />
          </FadeIn>
        </div>

        <FadeIn v-if="filtered && filtered.length === 0">
          <p class="body" style="text-align: center; padding: var(--sp-16) 0;">
            No projects in this category yet.
          </p>
        </FadeIn>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Projects' })

const { data: projects } = await useFetch('/api/projects')

const activeFilter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Extensions', value: 'extension' },
]

const filtered = computed(() => {
  if (!projects.value) return []
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter((p: any) => p.category === activeFilter.value)
})
</script>

<style scoped>
.filters {
  display: flex;
  gap: var(--sp-2);
  margin-bottom: var(--sp-8);
  flex-wrap: wrap;
}

.filter-btn {
  padding: var(--sp-2) var(--sp-5);
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: var(--r-full);
  color: var(--c-text-secondary);
  border: 1px solid var(--c-border);
  transition: all var(--duration-fast) var(--ease-out);
}

.filter-btn:hover {
  color: var(--c-text-primary);
  border-color: var(--c-border-hover);
}

.filter-btn.active {
  color: var(--c-text-inverse);
  background: var(--c-accent);
  border-color: var(--c-accent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--sp-6);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
