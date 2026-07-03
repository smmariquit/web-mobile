<template>
  <div class="page">
    <header class="page-head">
      <p class="kicker">06 · Stats</p>
      <div class="page-head__row">
        <h1 class="display">Live traffic across my sites.</h1>
      </div>
      <p class="lede" style="margin-top: 1rem;">
        Daily unique visitors from Vercel Web Analytics. Each bar is one UTC day; charts read oldest on the left, today on the right.
      </p>
    </header>

    <AnalyticsDashboard />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Stats' })
</script>
