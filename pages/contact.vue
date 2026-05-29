<template>
  <div>
    <section class="section">
      <div class="container">
        <FadeIn>
          <div class="contact-header">
            <p class="label">Contact</p>
            <h1 class="heading-xl">Let's work together.</h1>
            <p class="body-lg contact-header__body">
              I'm available for freelance web and mobile development projects.
              Drop me a message and I'll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        <div class="contact-grid">
          <!-- Form -->
          <FadeIn>
            <form class="contact-form card" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="contact-name" class="label">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-email" class="label">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-type" class="label">Project Type</label>
                <select id="contact-type" v-model="form.type" class="form-input">
                  <option value="" disabled>Select a project type</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="extension">Browser Extension</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="contact-message" class="label">Message</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  class="form-input form-textarea"
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn--primary" :disabled="submitted" style="width: 100%; justify-content: center;">
                {{ submitted ? 'Message Sent!' : 'Send Message →' }}
              </button>

              <p v-if="submitted" class="body" style="text-align: center; color: var(--c-teal); margin-top: var(--sp-3); font-size: 0.875rem;">
                Thanks! I'll get back to you soon.
              </p>
            </form>
          </FadeIn>

          <!-- Info sidebar -->
          <FadeIn>
            <div class="contact-info">
              <div class="card info-card">
                <h3 class="heading-sm">Direct Email</h3>
                <a href="mailto:semariquit@gmail.com" class="info-link">
                  semariquit@gmail.com
                </a>
              </div>

              <div class="card info-card">
                <h3 class="heading-sm">Connect</h3>
                <div class="info-links">
                  <a href="https://github.com/smmariquit" target="_blank" rel="noopener" class="info-link">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/stimmie" target="_blank" rel="noopener" class="info-link">
                    LinkedIn
                  </a>
                  <a href="https://stimmie.dev" target="_blank" rel="noopener" class="info-link">
                    stimmie.dev
                  </a>
                </div>
              </div>

              <div class="card info-card">
                <h3 class="heading-sm">Based In</h3>
                <p class="body">Philippines · UTC+08:00</p>
              </div>

              <div class="card info-card">
                <h3 class="heading-sm">Availability</h3>
                <div style="display: flex; align-items: center; gap: var(--sp-2);">
                  <span class="availability-dot"></span>
                  <p class="body" style="color: var(--c-teal);">Open to freelance work</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact' })

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

const submitted = ref(false)

async function handleSubmit() {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
  } catch {
    // Fallback — open mailto
    const subject = encodeURIComponent(`[Web Portfolio] ${form.type || 'Project'} inquiry from ${form.name}`)
    const body = encodeURIComponent(form.message)
    window.open(`mailto:semariquit@gmail.com?subject=${subject}&body=${body}`)
    submitted.value = true
  }
}
</script>

<style scoped>
.contact-header {
  max-width: 560px;
  margin-bottom: var(--sp-12);
}

.contact-header__body {
  margin-top: var(--sp-4);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--sp-8);
  align-items: start;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.form-input {
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--c-text-primary);
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  transition: border-color var(--duration-fast) var(--ease-out);
  outline: none;
}

.form-input:focus {
  border-color: var(--c-accent);
}

.form-input::placeholder {
  color: var(--c-text-tertiary);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239a9ab0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: var(--sp-10);
}

/* Info sidebar */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.info-card {
  padding: var(--sp-5) var(--sp-6);
}

.info-link {
  display: block;
  color: var(--c-accent);
  font-size: 0.9375rem;
  margin-top: var(--sp-2);
  transition: opacity var(--duration-fast);
}

.info-link:hover {
  opacity: 0.8;
}

.info-links {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.availability-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-teal);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
