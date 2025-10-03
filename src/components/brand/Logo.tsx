/**
 * Componente de Marca (Logo)
 * Centraliza el uso del logo principal y expone componentes reutilizables con tamaños uniformes.
 */
import React from 'react'

/** URL del logo principal (zorro azul) proporcionado por el usuario */
export const LOGO_URL =
  'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/814a58a2-2ce2-4bdc-9fec-161e3d9ef005.png'

/** Props comunes para componentes de logo */
interface LogoProps {
  /** Clases adicionales de Tailwind */
  className?: string
  /** Texto alternativo accesible */
  alt?: string
}

/**
 * LogoMark: versión cuadrada del logo (solo ícono).
 * Usa altura/anchura uniformes para mantener consistencia en la UI.
 */
export function LogoMark({ className = 'h-10 w-10', alt = 'Logo Smart Fox AI' }: LogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt={alt}
      className={`select-none rounded-md object-contain ${className}`}
      draggable={false}
    />
  )
}

/**
 * LogoWithWordmark: logo + nombre de marca.
 * Mantiene el ícono a la izquierda y el texto a la derecha con buen contraste.
 */
export function LogoWithWordmark({
  className = 'h-10 w-10',
  alt = 'Logo Smart Fox AI',
}: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark className={className} alt={alt} />
      <span className="hidden text-base font-semibold text-gray-900 sm:inline">Smart Fox AI</span>
    </div>
  )
}
