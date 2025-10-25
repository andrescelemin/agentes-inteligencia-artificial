/**
 * Cloudflare Worker: CORS Proxy para n8n
 *
 * PROPOSITO
 * - Actúa como proxy simple para sortear CORS desde el navegador hacia n8n.
 * - Responde con cabeceras CORS seguras sólo para orígenes permitidos.
 *
 * USO
 * - Despliega con Cloudflare (Workers) y establece estas variables:
 *   - ALLOWED_ORIGINS: lista separada por comas (ej: https://sider.ai,https://*.sider.ai)
 *   - ALLOWED_HOSTS  : lista de hostnames destino permitidos (ej: wsworkflow-n8n.vn0m5y.easypanel.host)
 *
 * PETICION
 *   POST { url, method?: 'POST'|'GET', headers?: Record&lt;string,string&gt;, body?: unknown }
 *
 * RESPUESTA
 *   Proxifica status y cuerpo del destino.
 */

export interface Env {
  ALLOWED_ORIGINS?: string
  ALLOWED_HOSTS?: string
}

function matchOrigin(origin: string | null, allowed: string[]): boolean {
  if (!origin) return false
  if (allowed.includes('*')) return true
  // Soporta wildcard simple *.dominio.tld
  for (const pat of allowed) {
    const p = pat.trim()
    if (!p) continue
    if (p === origin) return true
    if (p.startsWith('https://*.')) {
      const base = p.replace('https://*.', '')
      if (origin.startsWith('https://') && origin.endsWith(base)) return true
    }
  }
  return false
}

function setCorsHeaders(headers: Headers, origin: string): void {
  headers.set('Access-Control-Allow-Origin', origin)
  headers.set('Vary', 'Origin')
  headers.set('Access-Control-Allow-Credentials', 'false')
  headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const allowedOrigins = (env.ALLOWED_ORIGINS || '*')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const allowedHosts = (env.ALLOWED_HOSTS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    // Preflight
    if (request.method === 'OPTIONS') {
      const h = new Headers()
      setCorsHeaders(h, origin || '*')
      return new Response(null, { status: 204, headers: h })
    }

    // Seguridad de origen
    if (!matchOrigin(origin, allowedOrigins)) {
      const h = new Headers({ 'Content-Type': 'application/json' })
      setCorsHeaders(h, origin || '*')
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        status: 403,
        headers: h,
      })
    }

    // Leer payload
    let payload: any = {}
    try {
      payload = await request.json()
    } catch {
      // vacío
    }
    const url = payload?.url
    const method = (payload?.method || 'POST').toUpperCase()
    const headersObj = payload?.headers || {}
    const body = payload?.body

    try {
      if (!url) {
        const h = new Headers({ 'Content-Type': 'application/json' })
        setCorsHeaders(h, origin!)
        return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400, headers: h })
      }

      const target = new URL(url)
      if (allowedHosts.length && !allowedHosts.includes(target.hostname)) {
        const h = new Headers({ 'Content-Type': 'application/json' })
        setCorsHeaders(h, origin!)
        return new Response(JSON.stringify({ error: 'Host not allowed' }), {
          status: 403,
          headers: h,
        })
      }

      const targetRes = await fetch(url, {
        method,
        headers: headersObj,
        body: method === 'GET' ? undefined : JSON.stringify(body ?? {}),
      })

      // Leemos como texto para poder ajustar cabeceras
      const text = await targetRes.text()
      const h = new Headers(targetRes.headers)
      // Forzar CORS hacia el origen solicitante
      setCorsHeaders(h, origin!)
      return new Response(text, { status: targetRes.status, headers: h })
    } catch (e: any) {
      const h = new Headers({ 'Content-Type': 'application/json' })
      setCorsHeaders(h, origin || '*')
      return new Response(JSON.stringify({ error: e?.message || 'Proxy fetch error' }), {
        status: 502,
        headers: h,
      })
    }
  },
}