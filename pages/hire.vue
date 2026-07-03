<template>
  <div class="page hire-page">
    <header class="page-head">
      <p class="kicker">Hire</p>
      <div class="page-head__row">
        <h1 class="display measure">Fixed quote after a written scope.</h1>
        <div class="btn-row">
          <NuxtLink to="/contact" class="btn btn--solid">Send brief</NuxtLink>
          <a
            href="https://cal.com/simonee"
            target="_blank"
            rel="noopener"
            class="btn btn--line"
          >
            Book a call<span class="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
      <p class="lede measure hire-lede">
        {{ profile?.profile?.hireLede }}
      </p>
    </header>

    <div v-if="pricing && engagement" class="hire-body page-stack">
      <section class="hire-section" aria-labelledby="hire-process-title">
        <h2 id="hire-process-title" class="title-lg">How it works</h2>
        <p class="body-sm hire-section__intro measure">
          {{ engagement.trustNarrative }}
        </p>
        <ol class="hire-steps">
          <li v-for="(step, index) in engagement.process" :key="step.id" class="hire-steps__item">
            <span class="hire-steps__num mono" aria-hidden="true">{{ index + 1 }}</span>
            <div>
              <h3 class="title-sm">{{ step.title }}</h3>
              <p class="body-sm">{{ step.detail }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="hire-section" aria-labelledby="hire-rates-title">
        <h2 id="hire-rates-title" class="title-lg">Starting rates</h2>
        <p class="body-sm hire-section__intro measure">
          Floors by project type. After I read your brief, I place the work in a complexity band and send a fixed quote.
        </p>
        <ul class="hire-rates">
          <li v-for="service in pricing.services" :key="service.id" class="hire-rates__row">
            <div class="hire-rates__copy">
              <h3 class="title-sm">{{ service.title }}</h3>
              <p class="body-sm">{{ service.summary }}</p>
            </div>
            <div class="hire-rates__price mono">
              <span class="hire-rates__from">{{ service.startingAt.label }}</span>
              <span v-if="service.typical" class="caption hire-rates__typical">{{ service.typical.label }}</span>
            </div>
          </li>
        </ul>
        <p class="caption hire-rates__footnote">
          {{ pricing.hourly.label }} consulting for small follow-ups after scope is signed.
          {{ pricing.hourly.note }}
        </p>
      </section>

      <section class="hire-section" aria-labelledby="hire-bands-title">
        <h2 id="hire-bands-title" class="title-lg">Complexity bands</h2>
        <p class="body-sm hire-section__intro measure">
          {{ pricing.budgetTiersLede }}
        </p>
        <ul class="hire-bands">
          <li v-for="tier in pricing.budgetTiers" :key="tier.id" class="hire-bands__card">
            <div class="hire-bands__head">
              <h3 class="title-sm">{{ tier.title }}</h3>
              <span class="mono hire-bands__range">{{ tier.band }}</span>
            </div>
            <p class="body-sm">{{ tier.fit }}</p>
            <details v-if="tier.proof?.length" class="hire-bands__proof">
              <summary class="caption">Shipped examples</summary>
              <ul>
                <li v-for="item in tier.proof" :key="item.url">
                  <a :href="item.url" target="_blank" rel="noopener" class="text-link">
                    {{ item.label }}<span class="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </section>

      <section class="hire-section" aria-labelledby="hire-terms-title">
        <h2 id="hire-terms-title" class="title-lg">Before we build</h2>

        <div class="hire-point hire-point--payment">
          <span class="hire-point__icon" aria-hidden="true">
            <HireIcon name="payment" />
          </span>
          <div>
            <h3 class="title-sm">Payment</h3>
            <p class="body-sm">50% upfront, 50% on delivery. Scope and price in writing before code starts.</p>
          </div>
        </div>

        <div class="hire-foot">
          <div class="hire-foot__head">
            <p class="kicker">Coordination</p>
            <p class="kicker">Definition of done</p>
          </div>

          <div
            v-for="(row, index) in footRows"
            :key="index"
            class="hire-foot__row"
          >
            <div class="hire-foot__cell">
              <div v-if="row.coordination" class="hire-point">
                <span class="hire-point__icon" aria-hidden="true">
                  <HireIcon :name="row.coordination.icon" />
                </span>
                <component
                  :is="row.coordination.href ? 'a' : 'div'"
                  class="hire-point__body"
                  :href="row.coordination.href || undefined"
                  :target="row.coordination.href ? '_blank' : undefined"
                  :rel="row.coordination.href ? 'noopener' : undefined"
                >
                  <span class="title-sm">{{ row.coordination.title }}</span>
                  <span class="body-sm hire-point__detail">{{ row.coordination.detail }}</span>
                </component>
              </div>
            </div>

            <div class="hire-foot__cell">
              <div v-if="row.done" class="hire-point">
                <span class="hire-point__icon" aria-hidden="true">
                  <HireIcon :name="row.done.icon" />
                </span>
                <p class="body-sm hire-point__body">{{ row.done.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hire-cta" aria-labelledby="hire-cta-title">
        <div class="hire-cta__panel">
          <div class="hire-cta__copy">
            <p class="kicker">Next step</p>
            <h2 id="hire-cta-title" class="title-lg">Send the brief.</h2>
            <p class="body-sm measure">
              What you are building, who it is for, your deadline, and budget range. I reply within 1 to 2 weekdays.
            </p>
          </div>
          <div class="btn-row hire-cta__actions">
            <NuxtLink to="/contact" class="btn btn--solid">Explain your project</NuxtLink>
            <NuxtLink to="/projects" class="btn btn--line">See shipped work</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Hire' })

const [{ data: pricing }, { data: engagement }, { data: profile }] = await Promise.all([
  useFetch('/api/pricing'),
  useFetch('/api/engagement'),
  useFetch('/api/profile'),
])

const footRows = computed(() => {
  const coordination = engagement.value?.coordination ?? []
  const done = engagement.value?.definitionOfDone ?? []
  const length = Math.max(coordination.length, done.length)
  return Array.from({ length }, (_, index) => ({
    coordination: coordination[index] ?? null,
    done: done[index] ?? null,
  }))
})
</script>

<style scoped>
.hire-page {
  max-width: var(--content-max);
}

.hire-lede {
  margin-top: 1rem;
}

.hire-section__intro {
  margin-top: 0.75rem;
  color: var(--text-secondary);
}

.hire-steps {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding: 0;
  list-style: none;
}

.hire-steps__item {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 1rem 1.25rem;
  align-items: start;
}

.hire-steps__num {
  font-weight: 700;
  color: var(--accent);
  line-height: 1.35;
}

.hire-steps__item h3 {
  margin-bottom: 0.25rem;
}

.hire-steps__item p {
  color: var(--text-secondary);
}

.hire-rates {
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.hire-rates__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding: 1.1rem 0;
}

.hire-rates__row + .hire-rates__row {
  margin-top: 0.25rem;
  padding-top: 1.35rem;
}

.hire-rates__copy {
  flex: 1;
  min-width: min(100%, 16rem);
}

.hire-rates__copy h3 {
  margin-bottom: 0.25rem;
}

.hire-rates__copy p {
  color: var(--text-secondary);
}

.hire-rates__price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  text-align: right;
}

.hire-rates__from {
  font-size: var(--text-body);
  color: var(--accent);
}

.hire-rates__typical {
  color: var(--text-muted);
}

.hire-rates__footnote {
  margin-top: 0.75rem;
  color: var(--text-muted);
  max-width: var(--measure-prose);
}

.hire-bands {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.hire-bands__card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-hairline);
  border-radius: var(--r-md);
}

.hire-bands__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.35rem 0.75rem;
}

.hire-bands__range {
  color: var(--accent);
  font-size: var(--fs-caption);
}

.hire-bands__card > .body-sm {
  color: var(--text-secondary);
}

.hire-bands__proof {
  margin-top: 0.25rem;
}

.hire-bands__proof summary {
  cursor: pointer;
  color: var(--text-muted);
  list-style: none;
}

.hire-bands__proof summary::-webkit-details-marker {
  display: none;
}

.hire-bands__proof summary::before {
  content: '+ ';
  color: var(--accent);
}

.hire-bands__proof[open] summary::before {
  content: '− ';
}

.hire-bands__proof ul {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
}

.hire-point {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 0.85rem;
  align-items: start;
}

.hire-point--payment {
  margin-top: 1.25rem;
  max-width: var(--measure-prose);
}

.hire-point--payment h3 {
  margin-bottom: 0.25rem;
}

.hire-point--payment p {
  color: var(--text-secondary);
}

.hire-point__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--r-sm);
  background: var(--bg-surface);
  border: 1px solid var(--border-hairline);
  color: var(--accent);
}

.hire-point__icon :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
}

.hire-point__icon :deep(img) {
  width: 1.125rem;
  height: 1.125rem;
}

.hire-point__body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  color: inherit;
  min-height: 2.5rem;
  justify-content: center;
}

a.hire-point__body:hover .hire-point__detail {
  color: var(--accent);
}

a.hire-point__body:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--r-sm);
}

.hire-point__detail {
  color: var(--text-secondary);
}

.hire-foot {
  margin-top: 1.75rem;
}

.hire-foot__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 0.5rem;
}

.hire-foot__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  min-height: 4.75rem;
  padding: 0.85rem 0;
}

.hire-foot__row + .hire-foot__row {
  padding-top: 1rem;
}

.hire-foot__cell {
  min-width: 0;
}

.hire-foot__cell .hire-point__body {
  color: var(--text-secondary);
}

@media (max-width: 720px) {
  .hire-foot__head {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .hire-foot__row {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.75rem 0;
  }

  .hire-foot__row + .hire-foot__row {
    margin-top: 0.5rem;
    padding-top: 0.75rem;
  }
}

.hire-cta__panel {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  padding: clamp(1.75rem, 4vw, 2.25rem);
  background: var(--bg-surface);
  border: 1px solid var(--border-heavy);
  border-radius: var(--r-md);
}

.hire-cta__copy {
  flex: 1;
  min-width: min(100%, 18rem);
}

.hire-cta__copy .title-lg {
  margin: 0.35rem 0 0.5rem;
}

.hire-cta__actions {
  flex-shrink: 0;
}

@media (max-width: 820px) {
  .hire-bands {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 540px) {
  .hire-rates__price {
    align-items: flex-start;
    text-align: left;
  }

  .hire-cta__actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .hire-cta__actions .btn {
    width: 100%;
    white-space: normal;
    text-align: center;
  }
}
</style>
