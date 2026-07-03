<template>
  <div class="page hire-page">
      <header class="page-head">
        <p class="kicker">Hire</p>
        <div class="page-head__row">
          <h1 class="display measure">Budget shaped by constraints.</h1>
          <div class="btn-row">
            <a href="https://cal.com/simonee" target="_blank" rel="noopener" class="btn btn--solid">Book a call</a>
            <NuxtLink to="/contact" class="btn btn--line">Send brief</NuxtLink>
          </div>
        </div>
        <p class="lede measure hire-lede">
          {{ profile?.profile?.hireLede }}
        </p>
        <p v-if="profile?.profile?.hireExperienceNote" class="body-sm measure hire-experience">
          {{ profile.profile.hireExperienceNote }}
          <NuxtLink to="/about" class="hire-experience__link">About ↗</NuxtLink>
        </p>
      </header>

      <div v-if="pricing" class="hire-flow">
        <BudgetTiersPanel
          v-if="pricing.budgetTiers?.length"
          class="section-block"
          :lede="pricing.budgetTiersLede ?? ''"
          :tiers="pricing.budgetTiers"
        />

        <PricingPanel
          class="section-block"
          :services="pricing.services"
          :hourly="pricing.hourly"
          :note="pricing.note"
        />

        <ProcessSteps
          v-if="engagement?.process?.length"
          class="section-block"
          variant="cards"
          title="Process"
          :steps="engagement.process"
          :scope-example="engagement.scopeExample"
        />

        <section class="section-block hire-foot">
          <div class="hire-foot__col">
            <p class="kicker">Coordination</p>
            <ul class="coord-list">
              <li v-for="item in engagement?.coordination ?? []" :key="item.title">
                <component
                  :is="item.href ? 'a' : 'div'"
                  class="coord-row"
                  :href="item.href || undefined"
                  :target="item.href ? '_blank' : undefined"
                  :rel="item.href ? 'noopener' : undefined"
                >
                  <span class="title-sm">{{ item.title }}</span>
                  <span class="body-sm coord-row__detail">{{ item.detail }}</span>
                </component>
              </li>
            </ul>
          </div>

          <div class="hire-foot__col">
            <p class="kicker">Definition of done</p>
            <ul class="dod-list">
              <li v-for="item in engagement?.definitionOfDone ?? []" :key="item">
                {{ item }}
              </li>
            </ul>
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
</script>

<style scoped>
.hire-page {
  max-width: var(--content-max);
}

.hire-flow {
  display: flex;
  flex-direction: column;
}

.hire-lede {
  margin-top: 1rem;
}

.hire-experience {
  margin-top: 0.65rem;
  color: var(--text-muted);
}

.hire-experience__link {
  margin-left: 0.35rem;
  color: var(--accent);
}

.hire-experience__link:hover {
  text-decoration: underline;
}

.hire-foot {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.5rem;
}

.coord-list,
.dod-list {
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
}

.coord-list li,
.dod-list li {
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border-hairline);
}

.coord-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  color: inherit;
}

a.coord-row:hover .coord-row__detail {
  color: var(--accent);
}

.coord-row__detail {
  color: var(--text-secondary);
}

.dod-list li {
  color: var(--text-muted);
  font-size: var(--fs-body);
}

@media (max-width: 720px) {
  .hire-foot {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
