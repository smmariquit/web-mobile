<template>
  <component
    :is="linked ? 'a' : 'span'"
    v-bind="linked ? { href: githubUrl, target: '_blank', rel: 'noopener' } : {}"
    class="profile-avatar"
    :class="`profile-avatar--${size}`"
  >
    <img
      :src="src"
      :width="pixels"
      :height="pixels"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
  </component>
</template>

<script setup lang="ts">
import { PROFILE_AVATAR_URL } from '~/utils/github-avatar'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
    linked?: boolean
    alt?: string
  }>(),
  {
    size: 'md',
    linked: true,
    alt: 'Simonee Mariquit',
  },
)

const githubUrl = 'https://github.com/smmariquit'

const pixelMap = { sm: 48, md: 64, lg: 128, xl: 288 } as const

const pixels = computed(() => pixelMap[props.size])
const src = PROFILE_AVATAR_URL
</script>
