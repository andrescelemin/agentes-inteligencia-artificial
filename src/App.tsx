/**
 * App.tsx
 * Aplicación principal simplificada - Sin Service Worker, GTM ni componentes problemáticos
 */

import { HashRouter, Route, Routes } from 'react-router'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import Home from './pages/Home'

/**
 * LoadingSpinner
 * Indicador de carga simple durante el suspense de rutas.
 */
function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"
        aria-label="Cargando"
      />
    </div>
  )
}

/**
 * AppContent
 * Define las rutas sin componentes problemáticos
 */
function AppContent(): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  )
}

/**
 * App
 * Versión ultra-simplificada sin componentes externos problemáticos
 */
export default function App(): JSX.Element {
  return (
    <HashRouter>
      {/* Toasts globales */}
      <Toaster theme="dark" richColors position="top-center" />

      <AppContent />
    </HashRouter>
  )
}