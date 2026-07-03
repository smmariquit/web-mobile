<template>
  <section class="panel stimmie-map" :class="{ 'stimmie-map--compact': compact }">
    <div class="panel__head">
      <div>
        <p class="kicker">{{ compact ? compactTitle : 'What I do' }}</p>
        <p v-if="compact && compactLede" class="stimmie-map__intro body-sm">
          {{ compactLede }}
        </p>
        <p v-else-if="!compact" class="stimmie-map__intro body-sm">
          Client work lives here. Talks, writing, and community on
          <a href="https://stimmie.dev" target="_blank" rel="noopener">stimmie.dev</a>.
        </p>
      </div>
      <a :href="directory" target="_blank" rel="noopener" class="stimmie-map__directory caption">
        {{ compact ? 'stimmie.dev/links ↗' : 'Full directory ↗' }}
      </a>
    </div>

    <div v-if="compact" class="stimmie-pillars">
      <component
        :is="section.href ? 'a' : 'article'"
        v-for="(section, index) in visibleSections"
        :key="section.id"
        class="stimmie-pillar"
        :href="section.href || undefined"
        :target="section.href ? '_blank' : undefined"
        :rel="section.href ? 'noopener' : undefined"
      >
        <span class="stimmie-pillar__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3 class="stimmie-pillar__title">{{ section.label }}</h3>
        <p class="body-sm stimmie-pillar__summary">{{ section.summary }}</p>
        <p v-if="featuredItem(section)" class="stimmie-pillar__proof">
          <span class="stimmie-pillar__proof-label">{{ featuredItem(section)?.label }}</span>
          <span v-if="featuredItem(section)?.note" class="stimmie-pillar__proof-note">{{ featuredItem(section)?.note }}</span>
        </p>
        <span v-if="section.href" class="stimmie-pillar__cta caption mono">
          View all ↗
        </span>
      </component>
    </div>

    <div v-else class="stimmie-map__grid">
      <div v-for="section in visibleSections" :key="section.id" class="stimmie-map__section">
        <h3 class="stimmie-map__section-title">
          <a
            v-if="section.href"
            :href="section.href"
            target="_blank"
            rel="noopener"
          >{{ section.label }}</a>
          <span v-else>{{ section.label }}</span>
        </h3>

        <ul class="stimmie-map__links">
          <li v-for="item in itemsFor(section)" :key="item.href">
            <a :href="item.href" target="_blank" rel="noopener">{{ item.label }}</a>
            <span v-if="item.note" class="stimmie-map__note">{{ item.note }}</span>
          </li>
          <li v-if="overflowCount(section) > 0 && section.href" class="stimmie-map__more">
            <a :href="section.href" target="_blank" rel="noopener">
              +{{ overflowCount(section) }} more
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Section = {
  id: string
  label: string
  summary: string
  href?: string
  items: Array<{ label: string; href: string; note?: string }>
}

const props = withDefaults(
  defineProps<{
    sections?: Section[]
    directory?: string
    compact?: boolean
    compactTitle?: string
    compactLede?: string
    maxItems?: number
    sectionIds?: string[]
  }>(),
  {
    sections: () => [],
    directory: 'https://stimmie.dev/links',
    compact: false,
    compactTitle: 'Beyond client work',
    compactLede: 'Talks, writing, and side projects on my main site. The work above is what I build for clients.',
    maxItems: 4,
  },
)

const COMPACT_SECTION_IDS = ['ship', 'teach', 'write']

const visibleSections = computed(() => {
  const list = props.sections ?? []
  if (props.sectionIds?.length) {
    return list.filter((s) => props.sectionIds!.includes(s.id))
  }
  if (props.compact) {
    return list.filter((s) => COMPACT_SECTION_IDS.includes(s.id))
  }
  return list
})

const itemLimit = computed(() => (props.compact ? 3 : props.maxItems))

function itemsFor(section: Section) {
  return section.items.slice(0, itemLimit.value)
}

function overflowCount(section: Section) {
  return Math.max(0, section.items.length - itemLimit.value)
}

function featuredItem(section: Section) {
  return section.items[0] ?? null
}
</script>

<style scoped>
.stimmie-map__intro a {
  color: var(--c-accent);
}

.stimmie-map__intro a:hover {
  text-decoration: underline;
}

.stimmie-map__directory {
  color: var(--c-text-soft);
  white-space: nowrap;
}

.stimmie-map__directory:hover {
  color: var(--c-accent);
}

.stimmie-pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.stimmie-pillar {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-height: 100%;
  padding-top: 0.75rem;
  color: inherit;
}

a.stimmie-pillar:hover .stimmie-pillar__title {
  color: var(--c-accent);
}

.stimmie-pillar__index {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--c-accent);
}

.stimmie-pillar__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.stimmie-pillar__summary {
  color: var(--c-text-muted);
  flex: 1;
}

.stimmie-pillar__proof {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-top: 0.55rem;
}

.stimmie-pillar__proof-label {
  font-size: var(--fs-caption);
  font-weight: 600;
  color: var(--c-text);
}

.stimmie-pillar__proof-note {
  font-size: var(--fs-caption);
  color: var(--c-teal);
}

.stimmie-pillar__cta {
  margin-top: 0.35rem;
  color: var(--c-accent);
}

.stimmie-map__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem 2rem;
  margin-top: 1.25rem;
}

.stimmie-map__section-title {
  margin: 0 0 0.6rem;
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.stimmie-map__section-title a {
  color: var(--c-text);
}

.stimmie-map__section-title a:hover {
  color: var(--c-accent);
}

.stimmie-map__links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stimmie-map__links li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  font-size: var(--fs-caption);
  line-height: 1.45;
}

.stimmie-map__links a {
  color: var(--c-text-muted);
  font-weight: 500;
}

.stimmie-map__links a:hover {
  color: var(--c-accent);
}

.stimmie-map__note {
  color: var(--c-text-soft);
}

.stimmie-map__note::before {
  content: '·';
  margin-right: 0.35rem;
  color: var(--c-line);
}

.stimmie-map__more a {
  color: var(--c-text-soft);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.stimmie-map__more a:hover {
  color: var(--c-accent);
}

@media (max-width: 900px) {
  .stimmie-pillars {
    grid-template-columns: 1fr;
  }

  .stimmie-map__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .stimmie-map__grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
