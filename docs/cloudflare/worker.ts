/**
 * Cloudflare Worker - Relay to n8n Webhook with CORS
 * Purpose:
 * - Receive JSON or form data from browser (same-origin route or workers.dev)
 * - Handle CORS, preflight (OPTIONS), and forward to n8n webhook
 * - Return a clean 200/4xx with proper CORS headers
 *
 * Env Vars (Workers & Pages -> Settings -> Variables):
 * - N8N_URL (required): full n8n webhook URL, e.g.
 *   https://wsworkflow-n8n.vn0m5y.easypanel.host/webhook/formulario-contacto
 * - ALLOWED_ORIGINS (optional): comma-separated list.
 *   Example: https://tu-dominio.com,https://www.tu-dominio.com
 *   If not set, it defaults to '*' for rapid testing. Restrict in production.
 *
 * Recommended:
 * - Map a Route to your domain: https://tu-dominio.com/api/relay
 *   This enables same-origin requests from your site (no CORS).
 */

export interface Env {
  N8N_URL: string
  ALLOWED_ORIGINS?: string
}

/**
 * corsHeaders
 * Builds CORS headers based on Origin and allowed list.
 */
function corsHeaders(origin: string | null, allowedList?: string) {
  const allowed = (allowedList || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  let allowOrigin = '*'
  if (origin && allowed[0] !== '*') {
    allowOrigin = allowed.includes(origin) ? origin : allowed[0] || '*'
  } else if (allowed[0] !== '*') {
    allowOrigin = allowed[0]
  }

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

/**
 * handleOptions
 * Responds to preflight.
 */
async function handleOptions(request: Request, env: Env) {
  const origin = request.headers.get('Origin')
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin, env.ALLOWED_ORIGINS),
      Vary: 'Origin',
    },
  })
}

/**
 * readBody
 * Accepts JSON and also URL-encoded or multipart form-data.
 */
async function readBody(request: Request): Promise<Record<string, any>> {
  const ct = (request.headers.get('Content-Type') || '').toLowerCase()

  if (ct.includes('application/json')) {
    return await request.json()
  }

  if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    const form = await request.formData()
    const obj: Record<string, any> = {}
    // Normalize to simple key/value strings (n8n handles strings fine)
    form.forEach((value, key) => {
      // If file or blob, include its name; otherwise string
      if (value instanceof File) {
        obj[key] = value.name
      } else {
        obj[key] = String(value)
      }
    })
    return obj
  }

  // Default: try to read as text and attach raw
  const raw = await request.text().catch(() => '')
  return { _raw: raw }
}

/**
 * handlePost
 * Forwards body to N8N_URL with JSON, adding small relay metadata.
 */
async function handlePost(request: Request, env: Env) {
  const origin = request.headers.get('Origin')
  const cors = corsHeaders(origin, env.ALLOWED_ORIGINS)

  if (!env.N8N_URL) {
    return new Response(JSON.stringify({ ok: false, error: 'N8N_URL not configured' }), {
      status: 500,
      headers: {
        ...cors,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Vary: 'Origin',
      },
    })
  }

  let payload: any
  try {
    payload = await readBody(request)
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request body' }), {
      status: 400,
      headers: {
        ...cors,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Vary: 'Origin',
      },
    })
  }

  // Attach Cloudflare metadata
  const cfIp = request.headers.get('CF-Connecting-IP') || undefined
  const cfRay = request.headers.get('CF-Ray') || undefined
  const cfCountry = request.headers.get('CF-IPCountry') || undefined
  const forwardedBody = {
    ...payload,
    _relay: {
      cfIp,
      cfRay,
      cfCountry,
      ts: new Date().toISOString(),
      ua: request.headers.get('User-Agent') || '',
    },
  }

  try {
    const res = await fetch(env.N8N_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Relay-Agent': 'CloudflareWorker',
        ...(cfIp ? { 'X-Forwarded-For': cfIp } : {}),
      },
      body: JSON.stringify(forwardedBody),
    })

    const text = await res.text().catch(() => '')
    const status = res.status

    if (res.ok) {
      return new Response(JSON.stringify({ ok: true, status, passthrough: true }), {
        status: 200,
        headers: {
          ...cors,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
          Vary: 'Origin',
        },
      })
    } else {
      return new Response(JSON.stringify({ ok: false, status, error: text?.slice(0, 500) }), {
        status,
        headers: {
          ...cors,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
          Vary: 'Origin',
        },
      })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Relay fetch failed' }), {
      status: 502,
      headers: {
        ...cors,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Vary: 'Origin',
      },
    })
  }
}

export default {
  /**
   * Worker entry
   */
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // Allow POST/OPTIONS to "/" or "/relay"
    if (url.pathname === '/' || url.pathname === '/relay') {
      if (request.method === 'OPTIONS') {
        return handleOptions(request, env)
      }
      if (request.method === 'POST') {
        return handlePost(request, env)
      }
      // Method not allowed
      const origin = request.headers.get('Origin')
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          ...corsHeaders(origin, env.ALLOWED_ORIGINS),
          Allow: 'POST, OPTIONS',
          Vary: 'Origin',
        },
      })
    }

    // Not found
    const origin = request.headers.get('Origin')
    return new Response('Not Found', {
      status: 404,
      headers: {
        ...corsHeaders(origin, env.ALLOWED_ORIGINS),
        Vary: 'Origin',
      },
    })
  },
}
