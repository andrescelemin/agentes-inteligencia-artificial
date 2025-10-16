/**
 * ImageOptimizer Component
 * Componente para optimización avanzada de imágenes con múltiples formatos
 * y carga progresiva para mejorar Core Web Vitals
 */

import React from 'react'
import { LazyImage } from '../../hooks/useLazyLoad'

interface ImageOptimizerProps {
  /** URL de la imagen original */
  src: string
  /** Texto alternativo para accesibilidad */
  alt: string
  /** Ancho máximo de la imagen */
  width?: number
  /** Alto máximo de la imagen */
  height?: number
  /** Clases de Tailwind CSS adicionales */
  className?: string
  /** Calidad de la imagen (1-100) */
  quality?: number
  /** Formatos soportados */
  formats?: ('webp' | 'avif' | 'jpg' | 'png')[]
}

/**
 * Componente optimizador de imágenes con soporte para formatos modernos
 * y carga progresiva para mejorar LCP (Largest Contentful Paint)
 */
export function ImageOptimizer({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 80,
  formats = ['webp', 'jpg']
}: ImageOptimizerProps) {
  // En un entorno de producción, aquí se integraría con un servicio de optimización
  // como Cloudinary, Imgix, o next/image para Next.js
  const generateOptimizedSrc = (format: string) => {
    // Simulación de optimización - en producción conectar con CDN
    const params = new URLSearchParams({
      format,
      quality: quality.toString(),
      ...(width && { w: width.toString() }),
      ...(height && { h: height.toString() })
    })
    
    return `${src}?${params.toString()}`
  }

  return (
    <picture>
      {/* Fuentes optimizadas en orden de preferencia */}
      {formats.includes('avif') && (
        <source
          type="image/avif"
          srcSet={generateOptimizedSrc('avif')}
        />
      )}
      {formats.includes('webp') && (
        <source
          type="image/webp"
          srcSet={generateOptimizedSrc('webp')}
        />
      )}
      
      {/* Fallback para navegadores que no soportan formatos modernos */}
      <LazyImage
        src={generateOptimizedSrc(formats[formats.length - 1])}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover ${className}`}
      />
    </picture>
  )
}

/**
 * Componente para imágenes de fondo optimizadas
 */
interface OptimizedBackgroundProps {
  imageUrl: string
  children: React.ReactNode
  className?: string
}

export function OptimizedBackground({ 
  imageUrl, 
  children, 
  className = '' 
}: OptimizedBackgroundProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Imagen de pre-carga para LCP */}
      <link rel="preload" as="image" href={imageUrl} />
      {children}
    </div>
  )
}