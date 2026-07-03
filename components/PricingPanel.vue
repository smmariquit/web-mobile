<template>
  <section class="pricing-panel">
    <div class="panel__head">
      <p class="kicker">Engagement models</p>
      <span class="mono pricing-panel__hourly">{{ hourly.label }} · ₱{{ hourly.php.toLocaleString('en-US') }}/hr consulting</span>
    </div>

    <p class="pricing-panel__note measure">{{ note }}</p>

    <p class="data-band pricing-panel__flow">
      <span>50% upfront</span>
      <span>Scope in writing</span>
      <span>Staging review</span>
      <span>50% on delivery</span>
    </p>

    <ol class="engagement-list">
      <li v-for="service in services" :key="service.id" class="engagement-list__item">
        <div class="engagement-list__head">
          <h3 class="title-md">{{ service.title }}</h3>
          <span class="mono engagement-list__price">{{ service.startingAt.label }}</span>
        </div>
        <p class="body-sm">{{ service.description }}</p>
        <p v-if="service.scopeNote" class="caption engagement-list__scope">{{ service.scopeNote }}</p>
        <p v-if="service.typical" class="mono caption engagement-list__typical">{{ service.typical.label }}</p>
        <ul v-if="service.stack?.length" class="engagement-stack" :aria-label="`Stack for ${service.title}`">
          <li v-for="tech in service.stack" :key="tech.id" class="engagement-stack__chip">
            <img :src="tech.icon" alt="" width="18" height="18" class="engagement-stack__icon" />
            <span>{{ tech.name }}</span>
          </li>
        </ul>
      </li>
    </ol>

    <p class="caption pricing-panel__consult measure">{{ hourly.note }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  services: Array<{
    id: string
    title: string
    description: string
    scopeNote?: string
    stack?: Array<{ id: string; name: string; icon: string }>
    startingAt: { label: string; php: number }
    typical?: { label: string }
  }>
  hourly: { label: string; php: number; note: string }
  note: string
}>()
</script>

<style scoped>
.pricing-panel__hourly {
  font-size: var(--fs-caption);
  color: var(--text-muted);
}

.pricing-panel__note {
  margin: 0.75rem 0 1rem;
  color: var(--text-secondary);
}

.pricing-panel__flow {
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-hairline);
}

.engagement-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.engagement-list__item {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-hairline);
}

.engagement-list__item:last-child {
  border-bottom: none;
}

.engagement-list__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}

.engagement-list__price {
  font-size: var(--fs-body);
  color: var(--accent);
}

.engagement-list__scope {
  margin-top: 0.35rem;
  color: var(--text-muted);
}

.engagement-list__typical {
  margin-top: 0.25rem;
}

.engagement-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.65rem 0 0;
  padding: 0;
  list-style: none;
}

.engagement-stack__chip {
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

.engagement-stack__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.pricing-panel__consult {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-hairline);
  color: var(--text-muted);
}
</style>
