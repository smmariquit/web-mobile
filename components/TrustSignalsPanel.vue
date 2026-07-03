<template>
  <section class="trust-signals" :class="{ 'trust-signals--compact': compact }" aria-label="How we work together">
    <p class="trust-signals__copy">{{ narrative || fallbackNarrative }}</p>
    <NuxtLink v-if="!compact" to="/hire" class="btn btn--line btn--sm">
      How we work
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    compact?: boolean
    narrative?: string
  }>(),
  { compact: false },
)

const fallbackNarrative =
  'I put ownership, payment terms, timezone overlap, and change rules in writing before build starts. You own the repo, and extra work only happens through a documented scope update.'
</script>

<style scoped>
.trust-signals {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: var(--measure-prose);
}

.trust-signals__copy {
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--text-secondary);
}

.trust-signals .btn {
  align-self: flex-start;
  margin-top: 0.25rem;
}
</style>
