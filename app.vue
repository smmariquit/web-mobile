<template>
  <div id="app">
    <SiteNav />
    <main id="main-content">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title ? `${title} — Stimmie` : 'Stimmie — Web & Mobile Developer',
})
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

#main-content {
  flex: 1;
  padding-top: var(--nav-h);
}
</style>
