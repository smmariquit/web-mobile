// server/api/contact.post.ts

/**
 * POST /api/contact
 * Receives contact form submissions.
 * In production, this could forward to an email service, webhook, or database.
 * For now, it validates and logs the submission.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: name, email, message',
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address',
    })
  }

  // Log the submission (in production, send to email service or database)
  console.log('[Contact Form]', {
    name: body.name,
    email: body.email,
    type: body.type || 'unspecified',
    message: body.message.substring(0, 500),
    timestamp: new Date().toISOString(),
  })

  return {
    success: true,
    message: 'Your message has been received. I will get back to you soon!',
  }
})
