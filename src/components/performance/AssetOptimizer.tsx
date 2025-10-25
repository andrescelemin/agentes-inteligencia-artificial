/**
 * AssetOptimizer Component
 * Optimización avanzada de recursos estáticos y compresión
 */

import React from 'react'

interface AssetOptimizerProps {
  /** Tipo de recurso a optimizar */
  type: 'script' | 'style' | 'font'
  /** URL del recurso */
  src?: string
  /** Contenido inline (para CSS crítico) */
  inlineContent?: string
  /** Preload priority */
  priority?: 'high' | 'low'
}

/**
 * Componente para optimización de recursos estáticos
 * Gestiona preload, compresión y delivery óptimo
 */
export function AssetOptimizer({ 
  type, 
  src, 
  inlineContent, 
  priority = 'low' 
}: AssetOptimizerProps) {
  // Estrategias de optimización por tipo
  const optimizationStrategies = {
    script: {
      preload: 'script',
      crossOrigin: 'anonymous',
      fetchPriority: priority
    },
    style: {
      preload: 'style',
      crossOrigin: 'anonymous',
      fetchPriority: priority
    },
    font: {
      preload: 'font',
      crossOrigin: 'anonymous',
      fetchPriority: priority
    }
  }

  const strategy = optimizationStrategies[type]

  return (
    <>
      {/* Preload para recursos críticos */}
      {priority === 'high' && src && (
        <link 
          rel="preload" 
          href={src} 
          as={strategy.preload as any}
          crossOrigin={strategy.crossOrigin}
          fetchPriority={strategy.fetchPriority}
        />
      )}
      
      {/* Recurso principal */}
      {type === 'script' && src && (
        <script 
          src={src} 
          defer={priority === 'low'}
          async={priority === 'high'}
          crossOrigin={strategy.crossOrigin}
        />
      )}
      
      {type === 'style' && inlineContent && (
        <style dangerouslySetInnerHTML={{ __html: inlineContent }} />
      )}
      
      {type === 'style' && src && (
        <link 
          rel="stylesheet" 
          href={src} 
          crossOrigin={strategy.crossOrigin}
        />
      )}
    </>
  )
}

/**
 * Hook para gestión de recursos críticos
 */
export function useCriticalAssets() {
  const [loaded, setLoaded] = React.useState(false)
  
  React.useEffect(() => {
    // Simular carga de recursos críticos
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return { loaded }
}