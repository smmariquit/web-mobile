<template>
  <section class="panel stack-panel">
    <div class="panel__head">
      <p class="kicker">Stack</p>
      <span class="caption">From recent work</span>
    </div>

    <div v-if="displayGroups.length" class="stack-groups">
      <div v-for="group in displayGroups" :key="group.id" class="stack-group">
        <p class="stack-group__label">{{ group.label }}</p>
        <ul class="stack-chips">
          <li
            v-for="item in group.items"
            :key="item.id"
            class="stack-chip"
            :class="{
              'stack-chip--has-repos': item.repos?.length,
              'stack-chip--open': item.repos?.length && isOpen(group.id, item.id),
            }"
          >
            <button
              v-if="item.repos?.length"
              type="button"
              class="stack-chip__main stack-chip__trigger"
              :aria-expanded="isOpen(group.id, item.id)"
              :aria-controls="`stack-repos-${group.id}-${item.id}`"
            @click.stop="toggleChip(group.id, item.id)"
            >
              <img :src="item.icon" :alt="item.name" width="18" height="18" />
              <span>{{ item.name }}</span>
            </button>
            <span v-else class="stack-chip__main">
              <img :src="item.icon" :alt="item.name" width="18" height="18" />
              <span>{{ item.name }}</span>
            </span>
            <div
              v-if="item.repos?.length"
              :id="`stack-repos-${group.id}-${item.id}`"
              class="stack-chip__repos"
              @click.stop
            >
              <p class="stack-chip__repos-label mono">Repos</p>
              <ul>
                <li v-for="repo in item.repos" :key="repo.url">
                  <a :href="repo.url" target="_blank" rel="noopener">{{ repo.name }}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <p v-else class="body-sm stack-panel__empty">Stack loading…</p>
  </section>
</template>

<script setup lang="ts">
interface StackRepo {
  name: string
  url: string
}

interface StackItem {
  id: string
  name: string
  icon: string
  repos?: StackRepo[]
}

interface StackGroup {
  id: string
  label: string
  items: StackItem[]
}

interface Technology {
  id: string
  name: string
  icon: string
  category: string
  repoNames?: string[]
}

const props = withDefaults(defineProps<{
  groups?: StackGroup[]
  technologies?: Technology[]
}>(), {
  groups: () => [],
  technologies: () => [],
})

const displayGroups = computed(() => props.groups.length ? props.groups : [])

const openChipKey = ref<string | null>(null)

function chipKey(groupId: string, itemId: string) {
  return `${groupId}:${itemId}`
}

function isOpen(groupId: string, itemId: string) {
  return openChipKey.value === chipKey(groupId, itemId)
}

function toggleChip(groupId: string, itemId: string) {
  const key = chipKey(groupId, itemId)
  openChipKey.value = openChipKey.value === key ? null : key
}

function closeChip() {
  openChipKey.value = null
}

onMounted(() => {
  document.addEventListener('click', closeChip)
})

onUnmounted(() => {
  document.removeEventListener('click', closeChip)
})
</script>

<style scoped>
.stack-panel {
  height: auto;
}

.stack-groups {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stack-group__label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-text-soft);
  margin-bottom: 0.5rem;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.stack-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  font-size: var(--fs-caption);
  color: var(--c-text-muted);
  background: transparent;
  border: none;
  border-radius: 0;
}

.stack-chip--has-repos {
  cursor: pointer;
}

.stack-chip__trigger {
  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

.stack-chip--has-repos:hover,
.stack-chip--has-repos:focus-within,
.stack-chip--open {
  color: var(--c-text);
  z-index: 2;
}

.stack-chip__main {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.stack-chip__main img {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  opacity: 0.92;
}

.stack-chip__repos {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 0.35rem);
  min-width: 11rem;
  max-width: 16rem;
  padding: 0.55rem 0.65rem;
  background: var(--c-surface-2);
  border: 1px solid var(--c-line-strong);
  border-radius: var(--r-sm);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  z-index: 3;
}

.stack-chip__repos::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 0.35rem;
}

.stack-chip--has-repos:hover .stack-chip__repos,
.stack-chip--has-repos:focus-within .stack-chip__repos,
.stack-chip--open .stack-chip__repos {
  display: block;
}

.stack-chip__repos-label {
  margin-bottom: 0.35rem;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-text-soft);
}

.stack-chip__repos ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack-chip__repos a {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-accent);
  word-break: break-all;
  cursor: pointer;
}

.stack-chip__repos a:hover {
  text-decoration: underline;
}

.stack-panel__empty {
  color: var(--c-text-soft);
}
</style>
