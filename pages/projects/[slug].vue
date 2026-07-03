<template>
  <div v-if="project" class="page">
    <NuxtLink to="/projects" class="back caption">← All projects</NuxtLink>

    <header class="page-head" style="border: none; padding-bottom: 0;">
      <div class="detail-head">
        <div>
          <div class="detail-head__tags">
            <span class="tag tag--hot">{{ categoryLabel }}</span>
            <span class="tag mono">{{ project.year }}</span>
          </div>
          <h1 class="display">{{ project.title }}</h1>
          <p class="title-md detail-head__sub">{{ project.subtitle }}</p>
        </div>
        <div class="btn-row detail-head__actions">
          <a
            v-if="project.links.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener"
            class="btn btn--solid"
          >
            Live site
          </a>
          <a
            v-if="project.links.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener"
            class="btn btn--line"
          >
            GitHub repo
          </a>
        </div>
      </div>
    </header>

    <ProjectPreview
      v-if="hasPreview"
      :title="project.title"
      :previews="project.previews"
      :fallback-image="project.images?.[0]"
      :live-url="project.links.live"
      :github-url="project.links.github"
      :hardware="project.category === 'mobile' && !project.previews?.desktop"
      class="detail-preview"
    />

    <div class="detail-grid">
      <article class="detail-main">
        <section v-if="hasCaseStudy" class="panel case-study">
          <p class="kicker">Case study</p>
          <p class="lede detail-copy">{{ project.situation }}</p>

          <div class="case-flow">
            <section
              v-for="section in caseSections"
              :key="section.title"
              class="case-flow__section"
            >
              <h2 class="title-sm">{{ section.title }}</h2>
              <p class="body-sm">{{ section.copy }}</p>
            </section>
          </div>

          <p v-if="project.postmortem" class="body-sm case-study__post">
            <strong>Postmortem:</strong> {{ project.postmortem }}
          </p>
          <p class="body-sm detail-impact">
            <strong>Impact:</strong> {{ project.impact }}
          </p>
        </section>

        <section v-else class="panel">
          <p class="kicker">Overview</p>
          <p class="lede detail-copy">{{ project.description }}</p>
          <p class="body-sm detail-impact">
            <strong>Impact:</strong> {{ project.impact }}
          </p>
        </section>

        <div v-if="extraImages.length" class="gallery">
          <img v-for="img in extraImages" :key="img" :src="img" alt="" loading="lazy" />
        </div>
      </article>

      <aside class="detail-side">
        <section v-if="project.constraint" class="panel constraint-panel">
          <p class="kicker">Constraints</p>
          <p class="body-sm">{{ project.constraint }}</p>
        </section>

        <section class="panel">
          <p class="kicker">Stack</p>
          <div class="tags">
            <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
          </div>
        </section>

        <section v-if="project.links.github" class="panel">
          <p class="kicker">Repository</p>
          <a
            :href="project.links.github"
            target="_blank"
            rel="noopener"
            class="repo-link mono caption"
          >
            {{ repoLabel }}
          </a>
        </section>
      </aside>
    </div>

    <nav v-if="allProjects" class="detail-nav">
      <NuxtLink v-if="prevProject" :to="`/projects/${prevProject.slug}`" class="panel nav-link">
        <span class="caption">Previous</span>
        <span class="title-sm">{{ prevProject.title }}</span>
      </NuxtLink>
      <div v-else />
      <NuxtLink v-if="nextProject" :to="`/projects/${nextProject.slug}`" class="panel nav-link nav-link--next">
        <span class="caption">Next</span>
        <span class="title-sm">{{ nextProject.title }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: allProjects } = await useFetch('/api/projects')

const project = computed(() =>
  allProjects.value?.find((p: { slug: string }) => p.slug === route.params.slug),
)

const categoryLabel = computed(() => {
  const map: Record<string, string> = { web: 'Web', mobile: 'Mobile', extension: 'Extension' }
  return map[project.value?.category ?? ''] ?? project.value?.category
})

const hasPreview = computed(() => {
  const p = project.value?.previews
  return p && (p.desktop || p.tablet || p.mobile)
})

const hasCaseStudy = computed(() => Boolean(project.value?.situation))

const caseSections = computed(() => {
  const p = project.value
  if (!p) return []

  return [
    { title: 'Reasoning', copy: p.reasoning },
    { title: 'Choice', copy: p.decision },
    { title: "What I'd repeat", copy: p.craftMoment },
    { title: 'Outcome', copy: p.outcome },
  ].filter((section) => section.copy)
})

const extraImages = computed(() => {
  const images = project.value?.images ?? []
  const hero = project.value?.previews?.desktop
    || project.value?.previews?.mobile
    || images[0]
  return images.filter((img: string) => img !== hero)
})

const repoLabel = computed(() => {
  const url = project.value?.links.github
  if (!url) return ''
  return url.replace('https://github.com/', '')
})

const projectIndex = computed(() =>
  allProjects.value?.findIndex((p: { slug: string }) => p.slug === route.params.slug) ?? -1,
)

const prevProject = computed(() => {
  const i = projectIndex.value
  return i > 0 ? allProjects.value?.[i - 1] : null
})

const nextProject = computed(() => {
  const i = projectIndex.value
  const list = allProjects.value
  return list && i >= 0 && i < list.length - 1 ? list[i + 1] : null
})

useHead({
  title: () => project.value?.title ?? 'Project',
})
</script>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.back:hover { color: var(--accent); }

.detail-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.detail-head__tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-head__sub {
  color: var(--text-secondary);
  margin-top: 0.35rem;
}

.detail-preview {
  margin: 1.25rem 0 0.75rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17rem;
  gap: 0;
  align-items: start;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: clamp(1.5rem, 3vw, 2.5rem);
}

.detail-copy {
  margin-top: 0.75rem;
  max-width: none;
}

.detail-impact {
  margin-top: 1rem;
}

.detail-impact strong {
  color: var(--text-primary);
}

.case-flow {
  display: grid;
  gap: 1.1rem;
  margin-top: 1.35rem;
}

.case-flow__section {
  padding-top: 1rem;
  border-top: 1px solid var(--border-hairline);
}

.case-flow__section .body-sm {
  margin-top: 0.35rem;
}

.case-study__post {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-hairline);
  color: var(--text-secondary);
}

.case-study__post strong {
  color: var(--text-primary);
}

.constraint-panel .body-sm {
  margin-top: 0.75rem;
}

.gallery {
  display: grid;
  gap: 0.75rem;
}

.gallery img {
  width: 100%;
  border-radius: var(--r-md);
  border: 1px solid var(--border-hairline);
}

.detail-side {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: sticky;
  top: 1.5rem;
  padding-left: clamp(1.5rem, 3vw, 2.5rem);
  border-left: 1px solid var(--border-hairline);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.repo-link {
  display: inline-block;
  margin-top: 0.75rem;
  color: var(--accent);
  word-break: break-all;
}

.repo-link:hover {
  text-decoration: underline;
}

.detail-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 2rem;
}

.nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link--next {
  text-align: right;
  align-items: flex-end;
}

@media (max-width: 800px) {
  .detail-grid { grid-template-columns: 1fr; }

  .detail-main {
    padding-right: 0;
  }

  .detail-side {
    position: static;
    padding-left: 0;
    padding-top: 1.5rem;
    border-left: none;
    border-top: 1px solid var(--border-hairline);
  }
}
</style>
