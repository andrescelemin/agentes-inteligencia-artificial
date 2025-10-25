/**
 * GA4.tsx
 * Integración ligera de Google Analytics 4:
 * - Carga dinámica del script gtag.js con el Measurement ID.
 * - Page views en cambios de ruta (SPA).
 * - Envío de Web Vitals (LCP, FID, CLS, TTFB) como eventos sin interacción.
 * - Lee el ID desde:
 *    1) &lt;meta name="ga-measurement-id" content="G-XXXX" /&gt; en public/index.html
 *    2) window.__GA_MEASUREMENT_ID
 */

import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Obtiene el Measurement ID de GA4 desde meta o variable global. */
function getGaId(): string {
  const meta = document.querySelector('meta[name="ga-measurement-id"]') as HTMLMetaElement | null
  const fromMeta = meta?.content?.trim() || ''
  const fromGlobal = (window as any).__GA_MEASUREMENT_ID as string | undefined
  return (fromMeta || fromGlobal || '').trim()
}

/** Inyecta el script de gtag y lo inicializa sin enviar page_view automático. */
function ensureGtag(id: string): void {
  if (!id) {
    console.warn('[GA4] Measurement ID no definido. Añade &lt;meta name="ga-measurement-id" content="G-XXXX" /&gt;')
    return
  }
  const w = window as any
  if (!w.dataLayer) w.dataLayer = []
  if (typeof w.gtag === 'function') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)

  w.gtag = function gtag() {
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', id, { send_page_view: false })
}

/** Envía un evento a GA4 de forma segura. */
function sendGA(event: string, params: Record<string, any> = {}): void {
  const gtag: any = (window as any).gtag
  if (typeof gtag !== 'function') return
  gtag('event', event, params)
}

/** Registra observadores de Web Vitals básicos y los envía a GA4. */
function registerWebVitals(): void {
  // LCP
  try {
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      if (!entries.length) return
      const last = entries[entries.length - 1] as PerformanceEntry
      sendGA('web_vital', {
        event_category: 'Web Vitals',
        metric_name: 'LCP',
        // LCP en ms
        value: Math.round(last.startTime),
        non_interaction: true,
      })
    })
    po.observe({ type: 'largest-contentful-paint', buffered: true } as any)
  } catch {}

  // FID
  try {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any) {
        const fid = Math.round(entry.processingStart - entry.startTime)
        sendGA('web_vital', {
          event_category: 'Web Vitals',
          metric_name: 'FID',
          value: fid,
          non_interaction: true,
        })
      }
    })
    po.observe({ type: 'first-input', buffered: true } as any)
  } catch {}

  // CLS (acumulado y enviado al ocultar)
  try {
    let clsValue = 0
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
    })
    po.observe({ type: 'layout-shift', buffered: true } as any)

    const reportCLS = () => {
      sendGA('web_vital', {
        event_category: 'Web Vitals',
        metric_name: 'CLS',
        // GA requiere enteros: multiplicamos x1000
        value: Math.round(clsValue * 1000),
        non_interaction: true,
      })
    }
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') reportCLS()
    })
    addEventListener('pagehide', reportCLS)
  } catch {}

  // TTFB desde performance navigation
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (nav) {
      const ttfb = Math.round(nav.responseStart)
      sendGA('web_vital', {
        event_category: 'Web Vitals',
        metric_name: 'TTFB',
        value: ttfb,
        non_interaction: true,
      })
    }
  } catch {}
}

/**
 * GA4 Component
 * - Inicializa GA4 una vez y envía page_view en cada cambio de ruta.
 * - Registra Web Vitals.
 */
export default function GA4(): JSX.Element | null {
  const location = useLocation()

  useEffect(() => {
    const id = getGaId()
    ensureGtag(id)
    registerWebVitals()
  }, [])

  useEffect(() => {
    const id = getGaId()
    if (!id) return
    // Page view manual para SPA
    sendGA('page_view', {
      page_location: window.location.href,
      page_path: location.pathname + location.search + location.hash,
      page_title: document.title,
    })
  }, [location.pathname, location.search, location.hash])

  return null
}
