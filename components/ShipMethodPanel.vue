<template>
  <section class="ship-method">
    <p class="kicker">Ship method</p>
    <p class="body-sm ship-method__lede measure">Brief to production in three steps.</p>

    <ol class="editorial-steps">
      <li v-for="(step, index) in steps" :key="step.id" class="editorial-steps__item">
        <span class="editorial-steps__numeral">{{ numerals[index] }}</span>
        <div class="editorial-steps__copy">
          <h3 class="title-sm">{{ step.title }}</h3>
          <p class="body-sm">{{ step.detail }}</p>
          <p class="editorial-steps__out">{{ step.outcome }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
export interface ShipMethodStep {
  id: string
  title: string
  detail: string
  outcome: string
}

defineProps<{
  steps: ShipMethodStep[]
}>()

const numerals = ['I', 'II', 'III']
</script>

<style scoped>
.ship-method__lede {
  margin-top: 0.35rem;
  color: var(--c-text-soft);
}
</style>
