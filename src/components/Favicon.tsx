/**
 * Favicon dinámico
 * Inserta/actualiza los enlaces de íconos en el &lt;head&gt; usando el logo proporcionado.
 * Evita dependencias externas y garantiza consistencia en SPA.
 */
import React, { useEffect } from 'react'
import { LOGO_URL } from './brand/Logo'

/**
 * Crea un &lt;link&gt; para favicon/apple-touch-icon con marcado identificable.
 */
function createIconLink(rel: string, href: string, sizes?: string) {
  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  link.type = 'image/png'
  if (sizes) link.sizes = sizes
  link.setAttribute('data-app-favicon', 'true')
  return link
}

/**
 * Favicon: componente sin UI que inyecta los favicons en el head cuando se monta.
 */
export default function Favicon(): JSX.Element | null {
  useEffect(() => {
    const head = document.head
    // Limpia favicons previos gestionados por la app
    head.querySelectorAll('link[data-app-favicon="true"]').forEach((n) => n.remove())

    // Íconos estándar
    const icons = [
      createIconLink('icon', LOGO_URL),
      createIconLink('shortcut icon', LOGO_URL),
      createIconLink('apple-touch-icon', LOGO_URL),
    ]

    icons.forEach((l) => head.appendChild(l))

    // Limpieza al desmontar
    return () => {
      head.querySelectorAll('link[data-app-favicon="true"]').forEach((n) => n.remove())
    }
  }, [])

  return null
}
