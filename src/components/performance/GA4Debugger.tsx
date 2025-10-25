/**
 * GA4Debugger Component
 * Herramienta de desarrollo para verificar la implementación de Google Analytics 4
 * Solo se muestra en desarrollo para no afectar el rendimiento en producción
 */

import React, { useEffect, useState } from 'react'

/**
 * Componente de depuración para GA4
 * Muestra el estado de la implementación y ayuda a solucionar problemas
 */
export function GA4Debugger(): JSX.Element | null {
  const [gaStatus, setGaStatus] = useState<'checking' | 'loaded' | 'missing' | 'error'>('checking')
  const [measurementId, setMeasurementId] = useState<string>('')

  useEffect(() => {
    // Solo ejecutar en desarrollo
    if (process.env.NODE_ENV === 'production') return

    const checkGA4 = () => {
      try {
        // Obtener Measurement ID del meta tag
        const meta = document.querySelector('meta[name="ga-measurement-id"]') as HTMLMetaElement
        const id = meta?.content?.trim() || ''
        setMeasurementId(id)

        if (!id || id === 'G-TU_MEASUREMENT_ID_REAL') {
          setGaStatus('missing')
          return
        }

        // Verificar si gtag está cargado
        const w = window as any
        if (typeof w.gtag === 'function' && w.dataLayer) {
          setGaStatus('loaded')
        } else {
          setGaStatus('error')
        }
      } catch (error) {
        setGaStatus('error')
      }
    }

    // Esperar a que GA4 se cargue
    setTimeout(checkGA4, 2000)
  }, [])

  // No renderizar en producción
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">🔍 GA4 Debugger</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Measurement ID:</span>
          <span className={`font-mono ${measurementId ? 'text-green-600' : 'text-red-600'}`}>
            {measurementId || 'No configurado'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Estado:</span>
          <span className={
            gaStatus === 'loaded' ? 'text-green-600' :
            gaStatus === 'missing' ? 'text-red-600' :
            gaStatus === 'error' ? 'text-orange-600' : 'text-gray-600'
          }>
            {gaStatus === 'loaded' && '✅ Cargado'}
            {gaStatus === 'missing' && '❌ No configurado'}
            {gaStatus === 'error' && '⚠️ Error de carga'}
            {gaStatus === 'checking' && '⏳ Verificando...'}
          </span>
        </div>

        {gaStatus === 'missing' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
            <p className="text-yellow-800 text-xs">
              Reemplaza <code className="bg-yellow-100 px-1 rounded">G-TU_MEASUREMENT_ID_REAL</code> 
              con tu ID real en <code>public/index.html</code>
            </p>
          </div>
        )}

        {gaStatus === 'error' && (
          <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-2">
            <p className="text-orange-800 text-xs">
              GA4 no se está cargando. Verifica la consola para errores.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}