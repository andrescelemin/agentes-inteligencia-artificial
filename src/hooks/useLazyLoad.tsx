/**
 * useLazyLoad Hook
 * Implementa lazy loading nativo para imágenes usando Intersection Observer
 * Mejora Core Web Vitals y performance de carga
 */

import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadOptions {
  rootMargin?: string
  threshold?: number
  enableNativeLazyLoading?: boolean
}

/**
 * Hook para lazy loading de imágenes y componentes
 */
export function useLazyLoad<T extends HTMLElement = HTMLImageElement>(
  options: UseLazyLoadOptions = {}
): [React.RefObject<T>, boolean] {
  const { 
    rootMargin = '50px 0px', 
    threshold = 0,
    enableNativeLazyLoading = true
  } = options
  
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [rootMargin, threshold, isVisible])

  return [ref, isVisible]
}

/**
 * Componente LazyImage para carga optimizada de imágenes
 */
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string
  lowQualitySrc?: string
}

export function LazyImage({ 
  src, 
  alt, 
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  lowQualitySrc,
  className = '',
  ...props 
}: LazyImageProps) {
  const [imgRef, isVisible] = useLazyLoad<HTMLImageElement>()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholderSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  )
}