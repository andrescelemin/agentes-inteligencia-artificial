/**
 * Service Worker - Agentes IA
 * Cache estático + runtime con estrategias:
 * - CSS/JS: stale-while-revalidate
 * - Imágenes/Fuentes: cache-first
 * - Otros: network-first con fallback a cache
 */

const VERSION = 'v1.1.0'
const STATIC_CACHE = `agentes-ia-static-${VERSION}`
const RUNTIME_CACHE = `agentes-ia-runtime-${VERSION}`

/** Recursos estáticos críticos a precachear. */
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/src/shadcn.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (![STATIC_CACHE, RUNTIME_CACHE].includes(key)) {
            return caches.delete(key)
          }
        })
      )
    ).then(() => self.clients.claim())
  )
})

/** Permite activar SW actualizado inmediatamente. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

/**
 * Estrategias de caching por tipo de recurso.
 */
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Solo GET y mismo origen/HTTP(S)
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) return

  const destination = request.destination

  // Cache-first para imágenes y fuentes
  if (destination === 'image' || destination === 'font') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          const respClone = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, respClone))
          return response
        }).catch(() => caches.match('/favicon.svg'))
      })
    )
    return
  }

  // Stale-while-revalidate para CSS/JS
  if (destination === 'style' || destination === 'script') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          const respClone = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, respClone))
          return response
        }).catch(() => cached)
        return cached || networkFetch
      })
    )
    return
  }

  // Network-first para el resto (HTML, API, etc.)
  event.respondWith(
    fetch(request)
      .then((response) => {
        const respClone = response.clone()
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, respClone))
        return response
      })
      .catch(() => caches.match(request))
  )
})
