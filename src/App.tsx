import { HashRouter, Route, Routes } from 'react-router'
import { lazy, Suspense, useEffect } from 'react'
import MetaPixel from './integrations/facebook/MetaPixel'
import FacebookEvents from './integrations/facebook/FacebookEvents'
import { Toaster } from 'sonner'

/**
 * App.tsx
 * Root router with HashRouter; mounts global integrations (MetaPixel, FacebookEvents)
 * and a global Toaster for non-blocking notifications.
 * Also registers the Service Worker for caching and offline mode.
 */

// Lazy load Home to reduce initial JS
const HomePage = lazy(() => import('./pages/Home'))

/**
 * LoadingSpinner
 * Simple loading indicator during route suspense.
 */
function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" aria-label="Cargando" />
    </div>
  )
}

/**
 * App
 * Registers SW, mounts integrations, toaster and defines routes.
 */
export default function App(): JSX.Element {
  // Register Service Worker for caching and offline
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.warn('[SW] Registro fallido:', err))
    }
  }, [])

  return (
    <HashRouter>
      {/* Meta Pixel: SPA PageView + official script */}
      <MetaPixel />
      {/* Delegated click events for fbq */}
      <FacebookEvents />

      {/* Global toast notifications */}
      <Toaster theme="dark" richColors position="top-center" />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
