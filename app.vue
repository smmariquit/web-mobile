<template>
  <LayoutAppShell>
    <NuxtPage />
  </LayoutAppShell>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title ? `${title} · Simonee Mariquit` : 'Simonee Mariquit · Web & Mobile Developer',
})
</script>
