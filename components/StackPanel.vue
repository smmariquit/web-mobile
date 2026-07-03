<template>
  <section class="panel stack-panel" :class="{ 'stack-panel--prominent': prominent }">
    <div class="panel__head">
      <component :is="prominent ? 'h2' : 'p'" :class="prominent ? 'title-lg stack-panel__title' : 'kicker'">
        Stack
      </component>
      <span class="caption stack-panel__note">Hover or tap a chip to see projects.</span>
    </div>

    <p v-if="hasInteractiveChips && prominent" class="caption stack-panel__hint">
      Dashed borders mark chips with linked projects.
    </p>

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
              :aria-label="`${item.name}, ${item.repos.length} project${item.repos.length === 1 ? '' : 's'}. Hover or tap to show.`"
              @click.stop="toggleChip(group.id, item.id)"
            >
              <img :src="item.icon" alt="" :width="iconSize" :height="iconSize" />
              <span>{{ item.name }}</span>
              <span class="stack-chip__count mono" aria-hidden="true">{{ item.repos.length }}</span>
            </button>
            <span v-else class="stack-chip__main">
              <img :src="item.icon" :alt="item.name" :width="iconSize" :height="iconSize" />
              <span>{{ item.name }}</span>
            </span>
            <div
              v-if="item.repos?.length"
              :id="`stack-repos-${group.id}-${item.id}`"
              class="stack-chip__repos"
              role="region"
              :aria-label="`${item.name} projects`"
              @click.stop
            >
              <p class="stack-chip__repos-label mono">Projects</p>
              <ul>
                <li v-for="repo in item.repos" :key="repo.url">
                  <a :href="repo.url" target="_blank" rel="noopener">
                    {{ repo.name }}<span class="sr-only"> (opens in new tab)</span>
                  </a>
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
  prominent?: boolean
}>(), {
  groups: () => [],
  technologies: () => [],
  prominent: false,
})

const displayGroups = computed(() => props.groups.length ? props.groups : [])

const hasInteractiveChips = computed(() =>
  displayGroups.value.some((group) => group.items.some((item) => item.repos?.length)),
)

const iconSize = computed(() => (props.prominent ? 22 : 18))

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
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeChip)
  document.removeEventListener('keydown', onDocumentKeydown)
})

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeChip()
}
</script>

<style scoped>
.stack-panel {
  height: auto;
}

.stack-panel__title {
  margin: 0;
}

.stack-panel__note {
  color: var(--text-muted);
  text-align: right;
}

.stack-panel__hint {
  margin: -0.35rem 0 1rem;
  color: var(--text-muted);
}

.stack-panel--prominent .stack-panel__hint {
  margin-bottom: 1.25rem;
}

.stack-panel--prominent .panel__head {
  margin-bottom: 1.25rem;
}

.stack-panel--prominent .stack-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem 2rem;
}

.stack-panel--prominent .stack-group__label {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.stack-panel--prominent .stack-chips {
  gap: 0.5rem;
}

.stack-panel--prominent .stack-chip {
  padding: 0.45rem 0.7rem;
  font-size: var(--fs-body);
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
}

.stack-panel--prominent .stack-chip--has-repos {
  border-style: dashed;
  cursor: pointer;
}

.stack-panel--prominent .stack-chip--has-repos:hover,
.stack-panel--prominent .stack-chip--has-repos:focus-within,
.stack-panel--prominent .stack-chip--open {
  border-style: solid;
  border-color: var(--border-heavy);
  background: var(--c-surface-2);
}

.stack-panel--prominent .stack-chip__main img {
  width: 1.375rem;
  height: 1.375rem;
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

.stack-chip__trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--r-sm);
}

.stack-chip--has-repos:hover,
.stack-chip--has-repos:focus-within,
.stack-chip--open {
  color: var(--c-text);
  z-index: 2;
}

.stack-chip--has-repos .stack-chip__trigger {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: var(--border-hairline);
  text-underline-offset: 0.2em;
}

.stack-panel--prominent .stack-chip--has-repos .stack-chip__trigger {
  text-decoration: none;
}

.stack-chip__count {
  min-width: 1.1rem;
  padding: 0.05rem 0.35rem;
  font-size: 0.75em;
  line-height: 1.2;
  text-align: center;
  color: var(--text-muted);
  background: var(--c-surface-2);
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
}

.stack-panel--prominent .stack-chip__count {
  background: var(--bg-primary);
}

.stack-chip--has-repos:hover .stack-chip__count,
.stack-chip--open .stack-chip__count {
  color: var(--text-secondary);
  border-color: var(--border-heavy);
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
  font-weight: 600;
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  word-break: break-all;
  cursor: pointer;
}

.stack-chip__repos a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

.stack-panel__empty {
  color: var(--c-text-soft);
}

@media (max-width: 900px) {
  .stack-panel--prominent .stack-groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .stack-panel--prominent .stack-groups {
    grid-template-columns: 1fr;
  }
}
</style>
