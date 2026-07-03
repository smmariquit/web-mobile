export interface ContactPayload {
  name: string
  email: string
  type?: string
  message: string
  turnstileToken?: string
}

export function parseContactPayload(body: unknown): ContactPayload {
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }

  const raw = body as Record<string, unknown>
  const name = String(raw.name ?? '').trim()
  const email = String(raw.email ?? '').trim()
  const message = String(raw.message ?? '').trim()
  const type = raw.type ? String(raw.type).trim() : undefined
  const turnstileToken = raw.turnstileToken ? String(raw.turnstileToken) : undefined

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: name, email, message',
    })
  }

  if (name.length > 120 || email.length > 254 || message.length > 8000) {
    throw createError({ statusCode: 400, statusMessage: 'Field too long' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  return { name, email, type, message, turnstileToken }
}
