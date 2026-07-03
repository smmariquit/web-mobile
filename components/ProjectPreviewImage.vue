<template>
  <div ref="root" class="preview-image">
    <img
      v-if="src"
      :key="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
    <div
      v-else
      class="preview-image__fallback"
      :style="{ background: fallbackColor }"
    />
  </div>
</template>

<script setup lang="ts">
import type { PreviewSources } from '~/utils/pick-preview-src'
import { pickPreviewSrc } from '~/utils/pick-preview-src'

const props = withDefaults(
  defineProps<{
    previews?: PreviewSources | null
    fallback?: string
    alt: string
    fallbackColor?: string
    /** Always pick mobile assets (e.g. native app projects). */
    mobileFirst?: boolean
    /** Keep desktop screenshot in tiles and cards regardless of container width. */
    preferDesktop?: boolean
  }>(),
  {
    fallbackColor: 'var(--c-surface-2)',
    mobileFirst: false,
    preferDesktop: true,
  },
)

const root = ref<HTMLElement | null>(null)
const containerWidth = ref(720)

const src = computed(() =>
  pickPreviewSrc(containerWidth.value, props.previews, props.fallback, {
    mobileFirst: props.mobileFirst,
    preferDesktop: props.preferDesktop,
  }),
)

let observer: ResizeObserver | undefined

onMounted(() => {
  if (!root.value) return

  const measure = () => {
    if (!root.value) return
    containerWidth.value = root.value.getBoundingClientRect().width
  }

  measure()
  observer = new ResizeObserver(() => measure())
  observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.preview-image {
  container-type: inline-size;
}

.preview-image img {
  display: block;
  width: 100%;
  height: auto;
}

.preview-image__fallback {
  width: 100%;
  min-height: 8rem;
  opacity: 0.35;
}
</style>
