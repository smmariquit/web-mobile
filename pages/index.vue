<template>
  <div class="page home-page">
    <HomeHero
      :title="profile?.profile?.heroTitle ?? ''"
      :lede="profile?.profile?.homeLede ?? ''"
      :credibility="credibilityLine"
      github-url="https://github.com/smmariquit"
      :hero-project="heroProject"
      show-stats-link
    />

    <TrustSignalsPanel class="home-trust" :narrative="engagement?.trustNarrative" />

    <HomeFeaturedWork :projects="featuredProjectsForList" class="section-block" />

    <section class="home-about section-block">
      <div class="home-about__copy">
        <p class="kicker">About</p>
        <p class="body-sm measure">
          {{ profile?.profile?.aboutParagraph1 ?? profile?.profile?.aboutLede }}
        </p>
        <NuxtLink to="/about" class="home-about__link caption">Read more about me</NuxtLink>
      </div>
    </section>

    <HomeCta
      class="section-block"
      :web-from="pricing?.services?.[0]?.startingAt.label"
      :mobile-from="pricing?.services?.[1]?.startingAt.label"
    />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Work' })

const FEATURED_ORDER = ['hearthcraft', 'bus-ticketing-app', 'revolt', 'room-tba', 'atlas-of-my-skies'] as const

const [
  { data: projects },
  { data: pricing },
  { data: profile },
  { data: githubStats },
  { data: engagement },
] = await Promise.all([
  useFetch('/api/projects'),
  useFetch('/api/pricing'),
  useFetch('/api/profile'),
  useFetch('/api/github-stats'),
  useFetch('/api/engagement'),
])

const featuredProjects = computed(() => {
  const list = projects.value?.filter((p: { featured: boolean }) => p.featured) ?? []
  return [...list]
    .sort((a, b) => {
      const ia = FEATURED_ORDER.indexOf(a.slug as (typeof FEATURED_ORDER)[number])
      const ib = FEATURED_ORDER.indexOf(b.slug as (typeof FEATURED_ORDER)[number])
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    .slice(0, 5)
})

const heroProject = computed(() => featuredProjects.value[0] ?? null)

const featuredProjectsForList = computed(() => {
  const hero = heroProject.value
  if (!hero) return featuredProjects.value
  return featuredProjects.value.filter((p: { slug: string }) => p.slug !== hero.slug)
})

const credibilityLine = computed(() => {
  const stats = githubStats.value
  if (!stats?.totalStars && !stats?.projectsCount) return undefined

  const parts: string[] = []
  if (stats.totalStars != null) {
    parts.push(`${stats.totalStars.toLocaleString('en-US')} GitHub stars`)
  }
  if (stats.projectsCount != null) {
    parts.push(`${stats.projectsCount} public repos`)
  }
  if (stats.yearsOnGitHub != null) {
    parts.push(`${stats.yearsOnGitHub} years shipping`)
  }

  return parts.join(' · ')
})
</script>

<style scoped>
.home-trust {
  padding-top: 1.25rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--border-hairline);
}

.home-about__copy {
  max-width: var(--measure-prose);
}

.home-about__link {
  display: inline-block;
  margin-top: 0.75rem;
  color: var(--c-accent);
}

.home-about__link:hover {
  text-decoration: underline;
}
</style>
