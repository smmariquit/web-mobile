<template>
  <div class="page">
      <header class="page-head">
        <p class="kicker">02 · Projects</p>
        <div class="page-head__row">
          <h1 class="display">Projects with the reasoning left in.</h1>
        </div>
        <p class="lede" style="margin-top: 1rem;">
          Filter by type, then open a project to see the problem, constraint, choice, and trade-off behind the build.
        </p>
      </header>

      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter"
          :class="{ 'is-active': activeFilter === filter.value }"
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
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
  color: var(--text-muted);
  background: transparent;
}

.filter.is-active,
.filter:hover {
  color: var(--text-primary);
  border-color: var(--border-heavy);
  background: var(--bg-surface);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
  align-items: stretch;
}
</style>
