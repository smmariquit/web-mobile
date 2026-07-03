/**
 * Cloudflare Worker: portfolio contact form → Mailchannels email.
 *
 * Deploy: cd workers/contact && npx wrangler deploy
 *
 * DNS (on stimmie.dev zone):
 *   TXT  _mailchannels  v=mc1;
 *
 * Secrets (wrangler secret put …):
 *   CONTACT_SECRET          shared with Vercel NUXT_CONTACT_SECRET
 *   TURNSTILE_SECRET_KEY    optional — Cloudflare Turnstile
 */

export interface Env {
  CONTACT_SECRET: string
  CONTACT_TO: string
  CONTACT_FROM: string
  TURNSTILE_SECRET_KEY?: string
  ALLOWED_ORIGINS?: string
}

interface ContactBody {
  name: string
  email: string
  type?: string
  message: string
  turnstileToken?: string
}

const corsHeaders = (origin: string | null, env: Env) => {
  const allowed = (env.ALLOWED_ORIGINS ?? 'https://web.stimmie.dev,http://localhost:3000')
    .split(',')
    .map((value) => value.trim())

  const match = origin && allowed.includes(origin) ? origin : allowed[0]

  return {
    'Access-Control-Allow-Origin': match,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}

function parseBody(raw: unknown): ContactBody {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid body')

  const body = raw as Record<string, unknown>
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const type = body.type ? String(body.type).trim() : undefined
  const turnstileToken = body.turnstileToken ? String(body.turnstileToken) : undefined

  if (!name || !email || !message) throw new Error('Missing required fields')
  if (name.length > 120 || email.length > 254 || message.length > 8000) {
    throw new Error('Field too long')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email')

  return { name, email, type, message, turnstileToken }
}

async function verifyTurnstile(token: string, ip: string, secret: string) {
  const form = new FormData()
  form.append('secret', secret)
  form.append('response', token)
  if (ip) form.append('remoteip', ip)

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  }).then((r) => r.json() as Promise<{ success: boolean }>)

  if (!result.success) throw new Error('Turnstile verification failed')
}

async function sendMail(body: ContactBody, env: Env) {
  const subject = `[Portfolio] ${body.type || 'inquiry'} from ${body.name}`
  const text = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Type: ${body.type || 'unspecified'}`,
    '',
    body.message,
  ].join('\n')

  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: env.CONTACT_TO }] }],
      from: { email: env.CONTACT_FROM, name: 'web.stimmie.dev' },
      reply_to: { email: body.email, name: body.name },
      subject,
      content: [{ type: 'text/plain', value: text }],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Mailchannels error: ${response.status} ${detail}`)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const headers = corsHeaders(origin, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, headers)
    }

    const auth = request.headers.get('Authorization')
    if (auth !== `Bearer ${env.CONTACT_SECRET}`) {
      return json({ error: 'Unauthorized' }, 401, headers)
    }

    try {
      const body = parseBody(await request.json())

      if (env.TURNSTILE_SECRET_KEY) {
        if (!body.turnstileToken) throw new Error('Missing Turnstile token')
        const ip = request.headers.get('CF-Connecting-IP') ?? ''
        await verifyTurnstile(body.turnstileToken, ip, env.TURNSTILE_SECRET_KEY)
      }

      await sendMail(body, env)
      return json({ success: true, message: 'Sent' }, 200, headers)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bad request'
      return json({ error: message }, 400, headers)
    }
  },
}
