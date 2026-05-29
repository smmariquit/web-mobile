<template>
  <div>
    <!-- Hero -->
    <section class="hero section">
      <div class="container">
        <FadeIn>
          <div class="hero__content">
            <p class="label">Web &amp; Mobile Developer</p>

            <h1 class="heading-xl hero__heading">
              I build things for
              <br />
              <span class="hero__accent">screens of all sizes.</span>
            </h1>

            <p class="body-lg hero__body">
              I'm <strong>Stimmie</strong> — a software engineer from the Philippines
              who ships web apps, mobile apps, and browser extensions. From campus tools
              used by thousands to hardware-integrated POS systems, I turn ideas into
              polished products.
            </p>

            <div class="hero__actions">
              <NuxtLink to="/projects" class="btn btn--primary">
                View Projects
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <NuxtLink to="/contact" class="btn btn--outline">
                Hire Me
              </NuxtLink>
            </div>

            <div class="hero__stats">
              <div class="hero__stat">
                <span class="hero__stat-value">35+</span>
                <span class="hero__stat-label body">Projects shipped</span>
              </div>
              <div class="hero__stat">
                <span class="hero__stat-value">10K+</span>
                <span class="hero__stat-label body">Users reached</span>
              </div>
              <div class="hero__stat">
                <span class="hero__stat-value">6+</span>
                <span class="hero__stat-label body">Years building</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section" id="featured">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">Selected Work</p>
            <h2 class="heading-lg">Featured Projects</h2>
            <p class="body-lg">
              A few things I've built — from mobile apps with hardware integration to
              campus-wide tools.
            </p>
          </div>
        </FadeIn>

        <div v-if="featured" class="featured-grid">
          <FadeIn v-for="(project, i) in featured" :key="project.slug">
            <ProjectCard :project="project" :style="{ transitionDelay: `${i * 80}ms` }" />
          </FadeIn>
        </div>

        <FadeIn>
          <div style="text-align: center; margin-top: var(--sp-10);">
            <NuxtLink to="/projects" class="btn btn--outline">
              View All Projects
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- Services -->
    <section class="section" id="services">
      <div class="container">
        <FadeIn>
          <div class="section-header">
            <p class="label">What I Offer</p>
            <h2 class="heading-lg">Services</h2>
          </div>
        </FadeIn>

        <div class="services-grid">
          <FadeIn v-for="(service, i) in services" :key="service.title">
            <div class="card service-card" :style="{ transitionDelay: `${i * 80}ms` }">
              <span class="service-card__icon">{{ service.icon }}</span>
              <h3 class="heading-sm">{{ service.title }}</h3>
              <p class="body">{{ service.description }}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="cta">
      <div class="container">
        <FadeIn>
          <div class="cta-card card">
            <p class="label">Ready to build?</p>
            <h2 class="heading-lg">Let's make something great.</h2>
            <p class="body-lg">
              I'm available for freelance web and mobile development projects.
              Whether you need a full product, a feature, or consulting — let's talk.
            </p>
            <div class="cta-card__actions">
              <NuxtLink to="/contact" class="btn btn--primary">
                Get in Touch
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <a href="https://github.com/smmariquit" target="_blank" rel="noopener" class="btn btn--outline">
                GitHub Profile
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: null }) // uses default from app.vue

const { data: projects } = await useFetch('/api/projects')

const featured = computed(() =>
  projects.value?.filter((p: any) => p.featured) ?? []
)

const services = [
  {
    icon: '◆',
    title: 'Web Development',
    description:
      'Responsive, performant web applications with modern frameworks — Vue, React, Svelte, Next.js, or Nuxt. From landing pages to full-stack platforms.',
  },
  {
    icon: '◇',
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps with Flutter or React Native. Hardware integration, offline support, and native-feeling UIs.',
  },
  {
    icon: '▣',
    title: 'Browser Extensions',
    description:
      'Chrome, Firefox, and Edge extensions with Manifest V3. Published extensions with CI/CD pipelines and automated versioning.',
  },
  {
    icon: '▤',
    title: 'Technical Consulting',
    description:
      'Architecture guidance, code review, and DevOps setup. CI/CD pipelines, Docker, Vercel deployments, and team workflow optimization.',
  },
]
</script>

<style scoped>
/* Hero */
.hero {
  padding-top: var(--sp-24);
  padding-bottom: var(--sp-16);
}

.hero__content {
  max-width: 720px;
}

.hero__heading {
  margin-top: var(--sp-5);
}

.hero__accent {
  background: linear-gradient(135deg, var(--c-accent) 0%, #f0c674 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__body {
  margin-top: var(--sp-6);
  max-width: 560px;
}

.hero__body strong {
  color: var(--c-text-primary);
}

.hero__actions {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-8);
  flex-wrap: wrap;
}

.hero__stats {
  display: flex;
  gap: var(--sp-10);
  margin-top: var(--sp-12);
  padding-top: var(--sp-8);
  border-top: 1px solid var(--c-border);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.hero__stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--c-text-primary);
}

.hero__stat-label {
  font-size: 0.8125rem;
}

/* Section headers */
.section-header {
  margin-bottom: var(--sp-10);
}

.section-header .label {
  margin-bottom: var(--sp-3);
}

.section-header .heading-lg {
  margin-bottom: var(--sp-4);
}

/* Featured grid */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--sp-6);
}

/* Services grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-6);
}

.service-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.service-card__icon {
  font-size: 1.5rem;
  color: var(--c-accent);
  margin-bottom: var(--sp-2);
}

/* CTA */
.cta-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-16) var(--sp-8);
  background: linear-gradient(
    135deg,
    var(--c-bg-card) 0%,
    rgba(232, 169, 70, 0.04) 100%
  );
}

.cta-card .body-lg {
  max-width: 500px;
}

.cta-card__actions {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero {
    padding-top: var(--sp-16);
  }

  .hero__stats {
    gap: var(--sp-6);
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
