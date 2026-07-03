<template>
  <div class="page">
      <header class="page-head">
        <p class="kicker">Projects</p>
        <div class="page-head__row">
          <h1 class="display">Projects with the reasoning left in.</h1>
        </div>
        <p class="lede" style="margin-top: 1rem;">
          Filter by type, then open a project to see the problem, constraint, choice, and trade-off behind the build.
        </p>
      </header>

      <div class="filters" role="group" aria-label="Filter by project type">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          class="filter"
          :class="{ 'is-active': activeFilter === filter.value }"
          :aria-pressed="activeFilter === filter.value"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="project-grid">
        <WorkTile
          v-for="project in filtered"
          :key="project.slug"
          :project="project"
        />
      </div>
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
  { label: 'Extension', value: 'extension' },
]

const filtered = computed(() => {
  const list = projects.value ?? []
  if (activeFilter.value === 'all') return list
  return list.filter((p: { category: string }) => p.category === activeFilter.value)
})
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.filter {
  min-height: 44px;
  padding: 0.5rem 0.85rem;
  font-size: var(--fs-caption);
  font-weight: 600;
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
  color: var(--text-muted);
  background: #fff;
}

.filter.is-active,
.filter:hover {
  color: var(--text-primary);
  border-color: var(--border-heavy);
  background: var(--bg-surface);
}

.filter.is-active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
}

.filter:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.project-grid {
  column-width: 17.5rem;
  column-gap: 1.25rem;
}

@media (max-width: 640px) {
  .project-grid {
    column-width: auto;
    columns: 1;
  }
}
</style>
