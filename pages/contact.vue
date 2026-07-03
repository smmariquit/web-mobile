<template>
  <div class="page">
      <header class="page-head">
        <p class="kicker">Contact</p>
        <div class="page-head__row">
          <h1 class="display measure">Send a brief.</h1>
          <div class="btn-row">
            <a href="https://cal.com/simonee" target="_blank" rel="noopener" class="btn btn--solid">Book a 15-min call</a>
          </div>
        </div>
        <p class="lede measure" style="margin-top: 1rem;">
          Tell me what you are building, who it is for, your deadline, and your budget range. I reply within 24 hours on weekdays, Philippines time.
        </p>
      </header>

      <div class="contact-layout">
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="contact-form__row">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" v-model="form.name" class="input" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" class="input" required />
            </div>
          </div>
          <div class="field">
            <label for="type">Project type</label>
            <select id="type" v-model="form.type" class="input" required>
              <option value="" disabled>Select</option>
              <option value="web">Web app</option>
              <option value="mobile">Mobile app</option>
              <option value="extension">Browser extension</option>
              <option value="consulting">Consulting / CI</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="field">
            <label for="message">Brief</label>
            <textarea
              id="message"
              v-model="form.message"
              class="input input--area"
              placeholder="What, for whom, when, budget. Links help."
              required
            />
          </div>
          <div class="contact-form__actions">
            <button type="submit" class="btn btn--solid" :disabled="submitted">
              {{ submitted ? 'Sent' : 'Explain your project' }}
            </button>
            <p v-if="submitted" class="body-sm contact-form__success">Got it. I will reply soon.</p>
          </div>
        </form>

        <aside class="contact-aside">
          <ProcessSteps
            v-if="engagement?.process?.length"
            title="Next steps"
            :steps="engagement.process"
          />

          <section v-if="pricing">
            <p class="kicker">Quick rates</p>
            <ul class="rate-quick">
              <li v-for="s in pricing.services" :key="s.id">
                <span>{{ s.title }}</span>
                <span class="mono caption">{{ s.startingAt.label }}</span>
              </li>
            </ul>
            <p class="caption" style="margin-top: 0.75rem;">{{ pricing.hourly.label }} consulting · {{ pricing.note }}</p>
          </section>
        </aside>
      </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact' })

const [{ data: engagement }, { data: pricing }] = await Promise.all([
  useFetch('/api/engagement'),
  useFetch('/api/pricing'),
])

const form = reactive({ name: '', email: '', type: '', message: '' })
const submitted = ref(false)

async function handleSubmit() {
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    submitted.value = true
  } catch {
    const subject = encodeURIComponent(`[Portfolio] ${form.type} from ${form.name}`)
    const body = encodeURIComponent(form.message)
    window.open(`mailto:semariquit@gmail.com?subject=${subject}&body=${body}`)
    submitted.value = true
  }
}
</script>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, var(--measure-form)) minmax(0, 1fr);
  gap: 3rem;
  align-items: start;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: var(--measure-form);
}

.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.contact-form__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding-top: 0.5rem;
}

.contact-form__success {
  color: var(--accent);
}

.contact-aside {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: var(--measure-prose);
}

.rate-quick {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.rate-quick li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-hairline);
  font-size: var(--fs-body);
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-form__row {
    grid-template-columns: 1fr;
  }
}
</style>
