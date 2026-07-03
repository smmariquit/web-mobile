<template>
  <img v-if="imgSrc" :src="imgSrc" alt="" width="18" height="18" />
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'call'">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </template>
    <template v-else-if="name === 'email'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </template>
    <template v-else-if="name === 'timezone'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </template>
    <template v-else-if="name === 'scope'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z" />
      <path d="M14 2v6h6" />
    </template>
    <template v-else-if="name === 'staging'">
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 18v2" />
    </template>
    <template v-else-if="name === 'responsive'">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 20h10" />
      <path d="M9 16v4" />
      <path d="M15 16v4" />
    </template>
    <template v-else-if="name === 'checks'">
      <path d="M9 12 11 14 15 10" />
      <circle cx="12" cy="12" r="9" />
    </template>
    <template v-else-if="name === 'deploy'">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </template>
    <template v-else-if="name === 'payment'">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </template>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const imgSrc = computed(() => {
  if (props.name === 'github') return '/tech/github.svg'
  if (props.name === 'linkedin') return '/tech/linkedin.svg'
  return null
})
</script>
