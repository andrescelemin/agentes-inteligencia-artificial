/**
 * MetaPixel.tsx
 * Carga el script oficial de Meta Pixel, inicializa con el Pixel ID y
 * registra PageView en el montaje y en cada cambio de ruta (SPA).
 * - Lee el Pixel ID desde:
 *   1) <meta name="facebook-pixel-id" content="..."/> en public/index.html
 *   2) window.__META_PIXEL_ID (si lo defines en HTML)
 * - No rompe si el ID no está definido.
 */

import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Inicializa el script de Meta Pixel de forma idempotente. */
function ensureMetaPixel(id: string): void {
  if (!id || id === 'REPLACE_WITH_PIXEL_ID') {
    if (typeof window !== 'undefined') {
      console.warn('[MetaPixel] Pixel ID no definido. Añade <meta name="facebook-pixel-id" content="TU_ID" /> en index.html.')
    }
    return
  }

  const w = window as any
  if (typeof w.fbq === 'function') return

  // Snippet oficial de Meta Pixel
  !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  w.fbq('init', id)
  w.fbq('track', 'PageView')
}

/** Obtiene el Pixel ID desde meta tag o variable global. */
function getPixelId(): string {
  const meta = document.querySelector('meta[name="facebook-pixel-id"]') as HTMLMetaElement | null
  const fromMeta = meta?.content?.trim() || ''
  const fromGlobal = (window as any).__META_PIXEL_ID as string | undefined
  return (fromMeta || fromGlobal || '').trim()
}

/**
 * MetaPixel Component
 * - Montar una sola vez en el árbol, preferiblemente dentro del Router para SPA.
 */
export default function MetaPixel(): JSX.Element | null {
  const location = useLocation()

  // Montaje inicial: inyecta el script e inicia el pixel
  useEffect(() => {
    const id = getPixelId()
    ensureMetaPixel(id)
  }, [])

  // PageView en cada cambio de ruta
  useEffect(() => {
    const fbq: any = (window as any)?.fbq
    if (typeof fbq === 'function') {
      fbq('track', 'PageView')
    }
  }, [location.pathname, location.search, location.hash])

  return null
}
