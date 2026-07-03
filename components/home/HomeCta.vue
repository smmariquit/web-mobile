<template>
  <section class="home-cta" aria-labelledby="home-cta-title">
    <div class="home-cta__inner">
      <div class="home-cta__copy">
        <p class="kicker">Hire</p>
        <h2 id="home-cta-title" class="title-lg">
          Web from {{ webPrice }}. Mobile from {{ mobilePrice }}.
        </h2>
        <p class="body-sm measure">
          Send the brief, then I map the scope to a static site, cached app, or offline-capable build.
          The quote explains what we are leaving out and why.
        </p>
      </div>
      <div class="home-cta__actions btn-row">
        <NuxtLink to="/contact" class="btn btn--solid">Send brief</NuxtLink>
        <NuxtLink to="/hire" class="btn btn--line">Read the budget stories</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    webFrom?: string
    mobileFrom?: string
  }>(),
  {
    webFrom: 'From $400',
    mobileFrom: 'From $1,500',
  },
)

function priceOnly(label?: string) {
  return label?.replace(/^From\s+/i, '') ?? ''
}

const webPrice = computed(() => priceOnly(props.webFrom))
const mobilePrice = computed(() => priceOnly(props.mobileFrom))
</script>

<style scoped>
.home-cta {
  padding: clamp(1.75rem, 4vw, 2.5rem);
  background: var(--bg-surface);
  border: 1px solid var(--border-heavy);
  border-radius: var(--r-md);
}

.home-cta__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem 2rem;
}

.home-cta__copy {
  flex: 1;
  min-width: min(100%, 20rem);
}

.home-cta__copy .title-lg {
  margin: 0.5rem 0 0.65rem;
}

.home-cta__actions {
  flex-shrink: 0;
}

@media (max-width: 420px) {
  .home-cta__actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .home-cta__actions .btn {
    width: 100%;
    white-space: normal;
    text-align: center;
  }
}
</style>
