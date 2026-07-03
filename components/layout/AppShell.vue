<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <header class="site-header">
      <NuxtLink to="/" class="site-header__brand" aria-label="Simonee's web portfolio, home">
        <span class="site-header__name">Simonee's web portfolio</span>
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Primary">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="site-header__link"
          :class="{ 'is-active': isActive(item.to) }"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <nav class="dock-nav" aria-label="Mobile primary">
      <NuxtLink
        v-for="item in dockNav"
        :key="item.to"
        :to="item.to"
        class="dock-nav__item"
        :class="{ 'is-active': isActive(item.to) }"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <span class="dock-nav__icon" aria-hidden="true">
          <svg
            v-if="item.icon === 'work'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
            <path d="M9 21V12h6v9" />
          </svg>
          <svg
            v-else-if="item.icon === 'projects'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <svg
            v-else-if="item.icon === 'hire'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 13h18" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </span>
        <span class="dock-nav__label">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <main id="main-content" class="main" tabindex="-1">
      <NuxtRouteAnnouncer />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const nav = [
  { label: 'Work', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Hire', to: '/hire' },
  { label: 'About', to: '/about' },
  { label: 'Stats', to: '/stats' },
  { label: 'Contact', to: '/contact' },
]

const dockNav = [
  { label: 'Work', to: '/', icon: 'work' },
  { label: 'Projects', to: '/projects', icon: 'projects' },
  { label: 'Hire', to: '/hire', icon: 'hire' },
  { label: 'Contact', to: '/contact', icon: 'contact' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
