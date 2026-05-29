<template>
  <div ref="el" class="fade-up" :class="{ visible: isVisible }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ threshold?: number }>(), {
  threshold: 0.15,
})

const el = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: props.threshold }
  )
  observer.observe(el.value)
})
</script>
