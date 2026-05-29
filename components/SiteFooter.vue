<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__left">
          <div class="footer__brand">
            <span class="nav__logo">S</span>
            <span class="nav__name">stimmie<span class="nav__dot">.</span>dev</span>
          </div>
          <p class="body">
            Web &amp; mobile engineer based in the Philippines.
          </p>
        </div>

        <div class="footer__links">
          <div class="footer__col">
            <h4 class="label">Navigate</h4>
            <ul role="list">
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/projects">Projects</NuxtLink></li>
              <li><NuxtLink to="/about">About</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4 class="label">Connect</h4>
            <ul role="list">
              <li><a href="https://github.com/smmariquit" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="https://linkedin.com/in/stimmie" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://stimmie.dev" target="_blank" rel="noopener">Main Portfolio</a></li>
              <li><a href="mailto:semariquit@gmail.com">Email</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="divider" style="margin: var(--sp-8) 0 var(--sp-6);" />

      <div class="footer__bottom">
        <p class="body" style="font-size: 0.8125rem;">
          &copy; {{ new Date().getFullYear() }} Simonee Ezekiel Mariquit. Built with Nuxt &amp; Nitro.
        </p>
        <p class="body" style="font-size: 0.75rem; font-family: var(--font-mono);">
          Part of the
          <a href="https://stimmie.dev" class="footer__accent-link">stimmie.dev</a>
          ecosystem
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--c-bg-elevated);
  border-top: 1px solid var(--c-border);
  padding: var(--sp-16) 0 var(--sp-8);
  margin-top: var(--sp-20);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-12);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
}

.footer__links {
  display: flex;
  gap: var(--sp-12);
  justify-self: end;
}

.footer__col h4 {
  margin-bottom: var(--sp-4);
}

.footer__col ul {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.footer__col a {
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  transition: color var(--duration-fast);
}

.footer__col a:hover {
  color: var(--c-text-primary);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--sp-4);
}

.footer__accent-link {
  color: var(--c-accent) !important;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Reuse nav brand styles */
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

@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--sp-8);
  }

  .footer__links {
    justify-self: start;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
