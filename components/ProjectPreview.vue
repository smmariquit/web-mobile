<template>
  <section class="preview panel panel--flush">
    <div class="preview__toolbar">
      <p class="kicker">Preview</p>
      <div
        v-if="devices.length > 1"
        class="preview__toggles"
        role="tablist"
        aria-label="Device viewport"
      >
        <button
          v-for="device in devices"
          :key="device.id"
          type="button"
          role="tab"
          class="preview__toggle"
          :class="{ 'is-active': active === device.id }"
          :aria-selected="active === device.id"
          @click="selectDevice(device.id)"
        >
          {{ device.label }}
        </button>
      </div>
    </div>

    <div class="preview__stage" :class="`preview__stage--${active}`">
      <div class="device" :class="[`device--${active}`, { 'device--hardware': hardware }]">
        <template v-if="active === 'mobile' && !hardware">
          <div class="iphone">
            <div class="iphone__shell">
              <span class="iphone__btn iphone__btn--silent" />
              <span class="iphone__btn iphone__btn--vol-up" />
              <span class="iphone__btn iphone__btn--vol-down" />
              <span class="iphone__btn iphone__btn--power" />
              <div class="iphone__display">
                <span class="iphone__island" />
                <div class="iphone__screen">
                  <img
                    :src="currentSrc"
                    :alt="`${title} mobile preview`"
                    width="390"
                    height="844"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <span class="iphone__home" />
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="active === 'mobile' && hardware">
          <div class="device__screen device__screen--hardware">
            <img
              :src="currentSrc"
              :alt="`${title} device preview`"
              width="1280"
              height="800"
              decoding="async"
              loading="lazy"
            />
          </div>
        </template>

        <template v-else>
          <div class="device__chrome">
            <span class="device__dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span class="device__url mono caption">{{ liveUrl }}</span>
          </div>
          <div class="device__screen">
            <img
              :src="currentSrc"
              :alt="`${title} ${active} preview`"
              width="1280"
              height="800"
              decoding="async"
              loading="lazy"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="preview__links">
      <a
        v-if="liveUrl"
        :href="liveUrl"
        target="_blank"
        rel="noopener"
        class="btn btn--solid"
      >
        Visit live site<span class="sr-only"> (opens in new tab)</span>
      </a>
      <a
        v-if="githubUrl"
        :href="githubUrl"
        target="_blank"
        rel="noopener"
        class="btn btn--line"
      >
        View repo<span class="sr-only"> (opens in new tab)</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useViewportPreviewDevice } from '~/composables/useAdaptivePreview'

type DeviceId = 'desktop' | 'mobile'

interface Previews {
  desktop?: string
  tablet?: string
  mobile?: string
}

const props = defineProps<{
  title: string
  previews?: Previews | null
  fallbackImage?: string
  liveUrl?: string
  githubUrl?: string
  /** POS / hardware shots: skip phone chrome, default to device photo. */
  hardware?: boolean
}>()

const devices = computed(() => {
  const list: { id: DeviceId; label: string }[] = []
  if (props.previews?.desktop || (!props.previews?.mobile && props.fallbackImage)) {
    list.push({ id: 'desktop', label: 'Desktop' })
  }
  if (props.previews?.mobile) {
    list.push({ id: 'mobile', label: props.hardware ? 'Device' : 'Mobile' })
  }
  if (!list.length) {
    list.push({ id: 'desktop', label: 'Desktop' })
  }
  return list
})

const { active, selectDevice } = useViewportPreviewDevice(
  () => props.previews,
)

watch(
  devices,
  (list) => {
    const preferred = props.hardware && list.some((d) => d.id === 'mobile') ? 'mobile' : list[0]?.id
    if (preferred && active.value !== preferred && !list.some((d) => d.id === active.value)) {
      active.value = preferred
    }
    if (!list.some((d) => d.id === active.value)) {
      active.value = preferred ?? 'desktop'
    }
  },
  { immediate: true },
)

const currentSrc = computed(() => {
  if (active.value === 'mobile') {
    return props.previews?.mobile ?? props.fallbackImage ?? props.previews?.desktop ?? ''
  }
  return props.previews?.desktop ?? props.fallbackImage ?? props.previews?.mobile ?? ''
})

const liveUrl = computed(() => {
  if (!props.liveUrl) return ''
  try {
    return new URL(props.liveUrl).host
  } catch {
    return props.liveUrl
  }
})
</script>

<style scoped>
.preview {
  overflow: hidden;
}

.preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid var(--c-line);
}

.preview__toggles {
  display: flex;
  gap: 0.35rem;
  padding: 0.2rem;
  background: var(--c-bg);
  border: 1px solid var(--c-line);
  border-radius: var(--r-sm);
}

.preview__toggle {
  padding: 0.35rem 0.75rem;
  font-size: var(--fs-caption);
  font-weight: 600;
  color: var(--c-text-muted);
  border: 1px solid transparent;
  border-radius: 3px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.preview__toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.preview__toggle.is-active {
  background: var(--c-surface-2);
  color: var(--c-text);
  border-color: var(--c-line);
}

.preview__toggle:hover:not(.is-active) {
  color: var(--c-text);
}

.preview__stage {
  display: flex;
  justify-content: center;
  padding: 1.5rem 1rem 1.25rem;
  background:
    radial-gradient(circle at 50% 0%, rgba(229, 184, 74, 0.06), transparent 55%),
    var(--c-bg);
}

@media (max-width: 680px) {
  .preview__stage:not(.preview__stage--mobile) .device--desktop {
    max-width: min(100%, 520px);
  }
}

.device {
  transition: width 0.35s var(--ease), max-width 0.35s var(--ease);
}

.device--desktop {
  width: 100%;
  max-width: 920px;
}

.device--mobile {
  width: 100%;
  max-width: 320px;
}

.device--mobile.device--hardware {
  max-width: min(100%, 760px);
}

.device__chrome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  background: var(--c-surface-2);
  border: 1px solid var(--c-line);
  border-bottom: none;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
}

.device__dots {
  display: flex;
  gap: 0.3rem;
}

.device__dots i {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-line-strong);
}

.device__url {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--c-text-soft);
}

.iphone {
  width: 100%;
}

.iphone__shell {
  position: relative;
  padding: 0.65rem;
  border-radius: 2.85rem;
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.1) 0%, transparent 42%),
    linear-gradient(180deg, #3a3a42 0%, #141418 38%, #0c0c0f 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.14),
    0 0 0 2px #050507,
    0 28px 56px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.iphone__display {
  position: relative;
  overflow: hidden;
  border-radius: 2.2rem;
  background: #000;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.iphone__island {
  position: absolute;
  top: 0.55rem;
  left: 50%;
  z-index: 2;
  width: 5.75rem;
  height: 1.65rem;
  border-radius: 999px;
  background: #000;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 -1px 2px rgba(255, 255, 255, 0.06);
  transform: translateX(-50%);
  pointer-events: none;
}

.iphone__screen img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: top center;
}

.iphone__home {
  position: absolute;
  bottom: 0.45rem;
  left: 50%;
  z-index: 2;
  width: 5.75rem;
  height: 0.28rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  transform: translateX(-50%);
  pointer-events: none;
}

.iphone__btn {
  position: absolute;
  border-radius: 2px;
  background: linear-gradient(180deg, #55555f 0%, #2a2a30 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.iphone__btn--silent {
  top: 5.5rem;
  left: -0.12rem;
  width: 0.18rem;
  height: 1.75rem;
}

.iphone__btn--vol-up {
  top: 8.1rem;
  left: -0.12rem;
  width: 0.18rem;
  height: 2.75rem;
}

.iphone__btn--vol-down {
  top: 11.2rem;
  left: -0.12rem;
  width: 0.18rem;
  height: 2.75rem;
}

.iphone__btn--power {
  top: 7.5rem;
  right: -0.12rem;
  width: 0.18rem;
  height: 4.25rem;
}

.device__screen {
  border: 1px solid var(--c-line);
  border-radius: 0 0 var(--r-sm) var(--r-sm);
  overflow: hidden;
  background: #fff;
}

.device__screen img {
  display: block;
  width: 100%;
  height: auto;
}

.device__screen--hardware {
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--c-line);
  border-radius: var(--r-md);
  background: var(--bg-primary);
}

.device__screen--hardware img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.preview__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0 1.1rem 1.1rem;
}
</style>
