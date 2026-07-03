<template>
  <section class="budget-tiers">
    <div class="panel__head">
      <p class="kicker">Budget bands</p>
    </div>
    <p class="body-sm measure budget-tiers__lede">{{ lede }}</p>

    <ol class="budget-list">
      <li v-for="tier in tiers" :key="tier.id" class="budget-list__item">
        <div class="budget-list__head">
          <h3 class="title-md">{{ tier.title }}</h3>
          <span class="mono budget-list__band">{{ tier.band }}</span>
        </div>
        <ul v-if="tier.stack?.length" class="budget-stack" :aria-label="`Stack options for ${tier.title}`">
          <li v-for="tech in tier.stack" :key="tech.id" class="budget-stack__chip">
            <img :src="tech.icon" alt="" width="18" height="18" class="budget-stack__icon" />
            <span>{{ tech.name }}</span>
          </li>
        </ul>
        <p class="body-sm budget-list__fit">{{ tier.fit }}</p>
        <p class="body-sm budget-list__story">{{ tier.story }}</p>
        <p class="body-sm budget-list__trade">
          <strong>Trade-off:</strong> {{ tier.tradeOff }}
        </p>
        <p v-if="tier.proof?.length" class="data-band budget-list__proof">
          <span class="data-band__label">Proof</span>
          <a
            v-for="item in tier.proof"
            :key="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener"
            class="budget-list__proof-link"
          >{{ item.label }}</a>
        </p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  lede: string
  tiers: Array<{
    id: string
    band: string
    title: string
    fit: string
    story: string
    tradeOff: string
    stack?: Array<{ id: string; name: string; icon: string }>
    proof?: Array<{ label: string; repo: string; url: string }>
  }>
}>()
</script>

<style scoped>
.budget-tiers__lede {
  margin: 0.75rem 0 0.25rem;
  color: var(--text-secondary);
}

.budget-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.budget-list__item {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-hairline);
}

.budget-list__item:last-child {
  border-bottom: none;
}

.budget-list__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}

.budget-list__band {
  font-size: var(--fs-body);
  color: var(--accent);
}

.budget-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.65rem 0 0.75rem;
  padding: 0;
  list-style: none;
}

.budget-stack__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.55rem;
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  background: var(--c-surface-2);
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-sm);
}

.budget-stack__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.budget-list__fit {
  color: var(--text-secondary);
}

.budget-list__story {
  margin-top: 0.75rem;
  color: var(--text-secondary);
}

.budget-list__trade {
  margin-top: 0.55rem;
  color: var(--text-muted);
}

.budget-list__trade strong {
  color: var(--text-secondary);
}

.budget-list__proof {
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.budget-list__proof-link {
  color: var(--text-secondary);
  transition: color 0.15s var(--ease);
}

.budget-list__proof-link:hover {
  color: var(--accent);
}
</style>
