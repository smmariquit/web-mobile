<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner container">
      <NuxtLink to="/" class="nav__brand" aria-label="Home">
        <span class="nav__logo">S</span>
        <span class="nav__name">stimmie<span class="nav__dot">.</span>dev</span>
      </NuxtLink>

      <ul class="nav__links" role="list">
        <li><NuxtLink to="/" class="nav__link">Home</NuxtLink></li>
        <li><NuxtLink to="/projects" class="nav__link">Projects</NuxtLink></li>
        <li><NuxtLink to="/about" class="nav__link">About</NuxtLink></li>
        <li>
          <NuxtLink to="/contact" class="btn btn--primary nav__cta">
            Get in Touch
          </NuxtLink>
        </li>
      </ul>

      <button
        class="nav__toggle"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="nav__hamburger" :class="{ open: mobileOpen }"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="nav__mobile">
        <ul role="list">
          <li><NuxtLink to="/" class="nav__mobile-link" @click="mobileOpen = false">Home</NuxtLink></li>
          <li><NuxtLink to="/projects" class="nav__mobile-link" @click="mobileOpen = false">Projects</NuxtLink></li>
          <li><NuxtLink to="/about" class="nav__mobile-link" @click="mobileOpen = false">About</NuxtLink></li>
          <li>
            <NuxtLink to="/contact" class="btn btn--primary" style="width: 100%; justify-content: center;" @click="mobileOpen = false">
              Get in Touch
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

if (import.meta.client) {
  const onScroll = () => {
    scrolled.value = window.scrollY > 20
  }
  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  background: transparent;
  transition: background var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.nav--scrolled {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--c-border);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.nav__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--c-accent);
  color: var(--c-text-inverse);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: var(--r-sm);
}

.nav__name {
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.02em;
}

.nav__dot {
  color: var(--c-accent);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--sp-8);
}

.nav__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
  position: relative;
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--c-text-primary);
}

.nav__link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--c-accent);
  border-radius: 1px;
}

.nav__cta {
  font-size: 0.8125rem;
  padding: var(--sp-2) var(--sp-5);
}

/* Hamburger */
.nav__toggle {
  display: none;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
}

.nav__hamburger {
  position: relative;
  width: 18px;
  height: 2px;
  background: var(--c-text-primary);
  border-radius: 1px;
  transition: background var(--duration-fast);
}

.nav__hamburger::before,
.nav__hamburger::after {
  content: '';
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: var(--c-text-primary);
  border-radius: 1px;
  transition: transform var(--duration-normal) var(--ease-out);
}

.nav__hamburger::before { top: -6px; }
.nav__hamburger::after { top: 6px; }

.nav__hamburger.open {
  background: transparent;
}

.nav__hamburger.open::before {
  transform: translateY(6px) rotate(45deg);
}

.nav__hamburger.open::after {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile menu */
.nav__mobile {
  position: absolute;
  top: var(--nav-h);
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--c-border);
  padding: var(--sp-6);
}

.nav__mobile ul {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.nav__mobile-link {
  display: block;
  padding: var(--sp-3) 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--c-text-secondary);
  border-bottom: 1px solid var(--c-border);
}

.nav__mobile-link:hover {
  color: var(--c-text-primary);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) var(--ease-out);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

@media (max-width: 768px) {
  .nav__links {
    display: none;
  }

  .nav__toggle {
    display: flex;
  }
}
</style>
