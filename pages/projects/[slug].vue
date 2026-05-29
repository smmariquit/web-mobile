<template>
  <div v-if="project">
    <section class="section">
      <div class="container">
        <FadeIn>
          <NuxtLink to="/projects" class="btn btn--ghost back-link">
            <span aria-hidden="true">←</span>
            All Projects
          </NuxtLink>
        </FadeIn>

        <FadeIn>
          <div class="detail-header">
            <div class="detail-header__meta">
              <span class="tag tag--accent">{{ categoryLabel }}</span>
              <span class="mono" style="font-size: 0.8125rem; color: var(--c-text-tertiary);">{{ project.year }}</span>
            </div>

            <h1 class="heading-xl">{{ project.title }}</h1>
            <p class="heading-md detail-header__subtitle">{{ project.subtitle }}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div class="detail-body">
            <div class="detail-body__main">
              <h2 class="heading-sm" style="margin-bottom: var(--sp-4);">Overview</h2>
              <p class="body-lg">{{ project.description }}</p>

              <div class="detail-impact">
                <span class="label">Impact</span>
                <p class="body">{{ project.impact }}</p>
              </div>

              <div v-if="project.images && project.images.length" class="detail-gallery">
                <img v-for="img in project.images" :key="img" :src="img" class="detail-gallery__img" alt="Project Screenshot" loading="lazy" />
              </div>
            </div>

            <aside class="detail-body__sidebar">
              <div class="detail-meta-card card">
                <h3 class="heading-sm">Tech Stack</h3>
                <div class="detail-stack">
                  <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
                </div>

                <hr class="divider" style="margin: var(--sp-5) 0;" />

                <h3 class="heading-sm">Links</h3>
                <div class="detail-links">
                  <a
                    v-if="project.links.live"
                    :href="project.links.live"
                    target="_blank"
                    rel="noopener"
                    class="btn btn--primary"
                    style="width: 100%; justify-content: center;"
                  >
                    Visit Live Site →
                  </a>
                  <a
                    v-if="project.links.github"
                    :href="project.links.github"
                    target="_blank"
                    rel="noopener"
                    class="btn btn--outline"
                    style="width: 100%; justify-content: center;"
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>

        <!-- Adjacent navigation -->
        <FadeIn>
          <div class="detail-nav" v-if="allProjects">
            <NuxtLink
              v-if="prevProject"
              :to="`/projects/${prevProject.slug}`"
              class="detail-nav__item card"
            >
              <span class="body" style="font-size: 0.75rem;">← Previous</span>
              <span class="heading-sm">{{ prevProject.title }}</span>
            </NuxtLink>
            <div v-else></div>

            <NuxtLink
              v-if="nextProject"
              :to="`/projects/${nextProject.slug}`"
              class="detail-nav__item detail-nav__item--next card"
            >
              <span class="body" style="font-size: 0.75rem;">Next →</span>
              <span class="heading-sm">{{ nextProject.title }}</span>
            </NuxtLink>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>

  <div v-else>
    <section class="section">
      <div class="container" style="text-align: center; padding: var(--sp-24) 0;">
        <h1 class="heading-lg">Project not found</h1>
        <p class="body-lg" style="margin-top: var(--sp-4);">
          This project doesn't exist or has been moved.
        </p>
        <NuxtLink to="/projects" class="btn btn--primary" style="margin-top: var(--sp-8);">
          View All Projects
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: allProjects } = await useFetch('/api/projects')

const project = computed(() =>
  allProjects.value?.find((p: any) => p.slug === slug)
)

const currentIndex = computed(() =>
  allProjects.value?.findIndex((p: any) => p.slug === slug) ?? -1
)

const prevProject = computed(() =>
  currentIndex.value > 0 ? allProjects.value?.[currentIndex.value - 1] : null
)

const nextProject = computed(() =>
  allProjects.value && currentIndex.value < allProjects.value.length - 1
    ? allProjects.value[currentIndex.value + 1]
    : null
)

const categoryLabel = computed(() => {
  const map: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    extension: 'Extension',
  }
  return map[project.value?.category ?? ''] || project.value?.category || ''
})

useHead({
  title: computed(() => project.value?.title ?? 'Project'),
  meta: [
    {
      name: 'description',
      content: computed(() => project.value?.description ?? ''),
    },
  ],
})
</script>

<style scoped>
.back-link {
  margin-bottom: var(--sp-8);
}

.detail-header {
  margin-bottom: var(--sp-10);
}

.detail-header__meta {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
}

.detail-header__subtitle {
  color: var(--c-text-secondary);
  margin-top: var(--sp-3);
  font-weight: 400;
}

/* Two-column layout */
.detail-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--sp-10);
  align-items: start;
}

.detail-body__main {
  display: flex;
  flex-direction: column;
  gap: var(--sp-8);
}

.detail-impact {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-6);
  background: var(--c-bg-elevated);
  border-radius: var(--r-md);
  border-left: 3px solid var(--c-accent);
}

.detail-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  margin-top: var(--sp-8);
}

.detail-gallery__img {
  width: 100%;
  height: auto;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
}

/* Sidebar */
.detail-meta-card {
  position: sticky;
  top: calc(var(--nav-h) + var(--sp-6));
}

.detail-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-top: var(--sp-3);
}

.detail-links {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-top: var(--sp-3);
}

/* Nav */
.detail-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
  margin-top: var(--sp-16);
  padding-top: var(--sp-8);
  border-top: 1px solid var(--c-border);
}

.detail-nav__item {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-5) var(--sp-6);
}

.detail-nav__item--next {
  text-align: right;
}

@media (max-width: 768px) {
  .detail-body {
    grid-template-columns: 1fr;
  }

  .detail-meta-card {
    position: static;
  }

  .detail-nav {
    grid-template-columns: 1fr;
  }
}
</style>
