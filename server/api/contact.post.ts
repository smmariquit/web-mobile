import { parseContactPayload } from '../utils/contact-validate'

/**
 * POST /api/contact
 *
 * Local dev: logs submission.
 * Production: set CONTACT_WORKER_URL + CONTACT_SECRET to forward to the
 * Cloudflare Worker in workers/contact/ (Mailchannels + optional Turnstile).
 */
export default defineEventHandler(async (event) => {
  const payload = parseContactPayload(await readBody(event))
  const config = useRuntimeConfig(event)

  const workerUrl = config.contactWorkerUrl
  const secret = config.contactSecret

  if (workerUrl && secret) {
    await $fetch(workerUrl, {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
    })
  } else {
    console.log('[Contact Form]', {
      name: payload.name,
      email: payload.email,
      type: payload.type || 'unspecified',
      message: payload.message.substring(0, 500),
      timestamp: new Date().toISOString(),
    })
  }

  return {
    success: true,
    message: 'Your message has been received. I will get back to you soon!',
  }
})
