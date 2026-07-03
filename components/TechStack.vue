<template>
  <div class="tech-stack">
    <div
      v-for="tech in technologies"
      :key="tech.id"
      class="tech-item"
      :title="`${tech.name} — ${tech.repoCount} repo${tech.repoCount === 1 ? '' : 's'}`"
    >
      <img :src="tech.icon" :alt="tech.name" class="tech-icon" loading="lazy" width="32" height="32" />
      <span class="tech-label">{{ tech.name }}</span>
      <span class="tech-count mono">{{ tech.repoCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechItem {
  id: string
  name: string
  icon: string
  repoCount: number
}

defineProps<{
  technologies: TechItem[]
}>()
</script>

<style scoped>
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: var(--sp-3);
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-card);
  padding: var(--sp-4) var(--sp-3);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  transition: border-color var(--duration-fast);
  gap: var(--sp-2);
  min-height: 108px;
}

.tech-item:hover {
  border-color: var(--c-border-hover);
}

.tech-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.tech-label {
  font-size: 0.6875rem;
  color: var(--c-text-secondary);
  text-align: center;
  font-weight: 500;
  line-height: 1.2;
}

.tech-count {
  font-size: 0.625rem;
  color: var(--c-text-tertiary);
}
</style>
