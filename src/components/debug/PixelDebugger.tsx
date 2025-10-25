/**
 * PixelDebugger.tsx
 * Componente de depuración para verificar el estado del Pixel de Meta
 * Muestra información útil en la consola y en la interfaz (solo desarrollo)
 */

import { useEffect, useState } from 'react'

interface PixelStatus {
  loaded: boolean
  fbqAvailable: boolean
  lastEvent: string | null
  errors: string[]
}

/**
 * Componente de depuración del Pixel de Meta
 */
export default function PixelDebugger(): JSX.Element | null {
  const [status, setStatus] = useState<PixelStatus>({
    loaded: false,
    fbqAvailable: false,
    lastEvent: null,
    errors: []
  })

  useEffect(() => {
    const checkStatus = () => {
      const fbqAvailable = typeof (window as any).fbq === 'function'
      const loaded = fbqAvailable && (window as any).fbq.loaded === true

      setStatus(prev => ({
        ...prev,
        loaded,
        fbqAvailable
      }))
    }

    // Verificar estado inicial
    checkStatus()

    // Verificar periódicamente
    const interval = setInterval(checkStatus, 2000)

    return () => clearInterval(interval)
  }, [])

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg max-w-xs">
      <h4 className="font-bold mb-2">🔍 Meta Pixel Debugger</h4>
      
      <div className="space-y-1">
        <div className={`flex items-center ${status.fbqAvailable ? 'text-green-400' : 'text-red-400'}`}>
          <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
          fbq disponible: {status.fbqAvailable ? 'Sí' : 'No'}
        </div>
        
        <div className={`flex items-center ${status.loaded ? 'text-green-400' : 'text-yellow-400'}`}>
          <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
          Pixel cargado: {status.loaded ? 'Sí' : 'No'}
        </div>
        
        {status.lastEvent && (
          <div className="text-blue-400">
            Último evento: {status.lastEvent}
          </div>
        )}
        
        {status.errors.length > 0 && (
          <div className="text-red-400">
            Errores: {status.errors.length}
          </div>
        )}
      </div>

      <button 
        onClick={() => {
          console.log('🔍 Estado del Pixel:', status)
          console.log('🌐 Window.fbq:', (window as any).fbq)
          console.log('📊 dataLayer:', (window as any).dataLayer)
        }}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
      >
        Ver en Consola
      </button>
    </div>
  )
}
