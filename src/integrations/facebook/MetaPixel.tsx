/**
 * MetaPixel.tsx
 * Implementación básica del Pixel de Meta para SPA
 * Solo trackea PageView en cambios de ruta, evitando duplicar el inicial
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

declare global {
  interface Window {
    fbq: any
  }
}

export default function MetaPixel(): null {
  const location = useLocation()
  const initialPageViewSent = useRef(false)

  useEffect(() => {
    // Omitir el primer PageView porque ya lo envía el código base en index.html
    if (!initialPageViewSent.current) {
      initialPageViewSent.current = true
      return
    }

    // Trackear PageView en cambios de ruta
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
      console.log('📊 Meta Pixel: PageView tracked for route change')
    }
  }, [location.pathname, location.search, location.hash])

  return null
}