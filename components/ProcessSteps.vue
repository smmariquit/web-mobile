<template>
  <section class="process-panel" :class="`process-panel--${variant}`">
    <p class="kicker">{{ title }}</p>

    <ol v-if="steps?.length" class="process-steps" :class="`process-steps--${variant}`">
      <li
        v-for="(step, i) in steps"
        :key="step.id ?? i"
        class="process-steps__item"
      >
        <div class="process-steps__marker" aria-hidden="true">
          <span class="process-steps__numeral">{{ stepNumber(i) }}</span>
          <span class="process-steps__icon">
            <component :is="iconFor(step.id)" />
          </span>
        </div>

        <div class="process-steps__copy">
          <h3 class="title-sm">{{ step.title }}</h3>
          <p class="body-sm process-steps__detail">{{ step.detail }}</p>
          <p v-if="step.deliverable" class="process-steps__out">
            <span class="process-steps__tag">{{ step.deliverable }}</span>
          </p>
        </div>
      </li>
    </ol>

    <div v-else-if="narrative" class="process-narrative">
      <p class="body-sm">{{ narrative }}</p>
    </div>

    <div v-if="scopeExample?.length" class="scope-example" :class="`scope-example--${variant}`">
      <div class="scope-example__head">
        <span class="scope-example__glyph" aria-hidden="true">§</span>
        <p class="caption scope-example__label">Scope excerpt</p>
      </div>
      <ul>
        <li v-for="item in scopeExample" :key="item" class="body-sm">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue'

withDefaults(
  defineProps<{
    title?: string
    narrative?: string
    scopeExample?: string[]
    variant?: 'list' | 'cards'
    steps?: Array<{
      id?: string
      title: string
      detail: string
      deliverable?: string
    }>
  }>(),
  { variant: 'list', title: 'Process' },
)

function stepNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '1.75',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const BriefIcon: FunctionalComponent = () =>
  h('svg', iconProps, [
    h('path', { d: 'M4 6h16v12H4z' }),
    h('path', { d: 'm4 6 8 6 8-6' }),
  ])

const ScopeIcon: FunctionalComponent = () =>
  h('svg', iconProps, [
    h('path', { d: 'M7 4h10v16H7z' }),
    h('path', { d: 'M9 8h6M9 12h6M9 16h4' }),
  ])

const BuildIcon: FunctionalComponent = () =>
  h('svg', iconProps, [
    h('path', { d: 'm8 9-4 4 4 4' }),
    h('path', { d: 'm16 9 4 4-4 4' }),
    h('path', { d: 'M13 6 11 18' }),
  ])

const LaunchIcon: FunctionalComponent = () =>
  h('svg', iconProps, [
    h('path', { d: 'M12 3v12' }),
    h('path', { d: 'm7 10 5 5 5-5' }),
    h('path', { d: 'M5 21h14' }),
  ])

const DefaultIcon: FunctionalComponent = () =>
  h('svg', iconProps, [h('circle', { cx: '12', cy: '12', r: '8' })])

const STEP_ICONS: Record<string, FunctionalComponent> = {
  brief: BriefIcon,
  scope: ScopeIcon,
  build: BuildIcon,
  launch: LaunchIcon,
}

function iconFor(id?: string) {
  return STEP_ICONS[id ?? ''] ?? DefaultIcon
}
</script>

<style scoped>
.process-panel .kicker {
  margin-bottom: 0.85rem;
}

.process-panel--cards {
  max-width: none;
}

.process-narrative {
  color: var(--text-secondary);
}

.process-steps {
  margin: 0;
  padding: 0;
  list-style: none;
}

.process-steps__item {
  display: grid;
  gap: 0.85rem 1rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--border-hairline);
}

.process-steps__item:last-child {
  border-bottom: none;
}

.process-steps--list .process-steps__item {
  grid-template-columns: 3.25rem minmax(0, 1fr);
  align-items: start;
}

.process-steps__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
}

.process-steps__numeral {
  font-family: var(--font-mono);
  font-size: var(--fs-caption);
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
}

.process-steps__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid rgba(14, 107, 95, 0.18);
  border-radius: var(--r-sm);
}

.process-steps__icon :deep(svg) {
  width: 1.1rem;
  height: 1.1rem;
}

.process-steps__detail {
  color: var(--text-secondary);
}

.process-steps__out {
  margin: 0.55rem 0 0;
}

.process-steps__tag {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.55rem;
  font-size: var(--fs-caption);
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid rgba(14, 107, 95, 0.16);
  border-radius: var(--r-sm);
}

.process-steps--cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.process-steps--cards .process-steps__item {
  grid-template-columns: 1fr;
  padding: 1.15rem 1.1rem 1.2rem;
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-md);
  background: var(--c-surface);
}

.process-steps--cards .process-steps__marker {
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.process-steps--cards .process-steps__icon {
  width: 2.25rem;
  height: 2.25rem;
}

.scope-example {
  margin-top: 1.25rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border-hairline);
}

.scope-example--cards {
  margin-top: 1.5rem;
  padding: 1.1rem 1.15rem 1.15rem;
  border: 1px solid var(--border-hairline);
  border-left: 3px solid var(--accent);
  border-radius: var(--r-md);
  background: var(--c-surface);
}

.scope-example__head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
}

.scope-example__glyph {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1;
  color: var(--accent);
}

.scope-example__label {
  margin: 0;
  color: var(--text-muted);
}

.scope-example ul {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.scope-example--cards ul {
  gap: 0.55rem;
}

.scope-example li {
  color: var(--text-secondary);
  padding-left: 0.85rem;
  border-left: 1px solid var(--border-hairline);
}

@media (max-width: 720px) {
  .process-steps--cards {
    grid-template-columns: 1fr;
  }

  .process-steps--list .process-steps__item {
    grid-template-columns: 2.75rem minmax(0, 1fr);
  }
}
</style>
