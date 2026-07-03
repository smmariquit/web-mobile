import type { PreviewSources } from '~/utils/pick-preview-src'
import { pickPreviewDevice, pickPreviewSrc, resolvePreviewDevice } from '~/utils/pick-preview-src'

export function useAdaptivePreview(
  previews: MaybeRefOrGetter<PreviewSources | null | undefined>,
  fallback: MaybeRefOrGetter<string | undefined>,
  options?: MaybeRefOrGetter<{ mobileFirst?: boolean } | undefined>,
) {
  const root = ref<HTMLElement | null>(null)
  const containerWidth = ref(720)

  const src = computed(() =>
    pickPreviewSrc(
      containerWidth.value,
      toValue(previews),
      toValue(fallback),
      toValue(options),
    ),
  )

  const device = computed(() =>
    resolvePreviewDevice(
      pickPreviewDevice(containerWidth.value, toValue(options)),
      toValue(previews),
    ),
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

  return { root, src, device, containerWidth }
}

export function useViewportPreviewDevice(
  previews: MaybeRefOrGetter<PreviewSources | null | undefined>,
) {
  const active = ref<'desktop' | 'mobile'>('desktop')

  function selectDevice(id: 'desktop' | 'mobile') {
    if (id === 'mobile') {
      active.value = resolvePreviewDevice('mobile', toValue(previews)) === 'mobile' ? 'mobile' : 'desktop'
      return
    }
    active.value = 'desktop'
  }

  return { active, selectDevice }
}
