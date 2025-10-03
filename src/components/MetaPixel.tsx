/**
 * MetaPixel: Inyecta el píxel de Meta en <head> y registra eventos en una SPA.
 * - Inserta el loader oficial + init una sola vez (guard por ID).
 * - Añade el evento ViewContent "junto al pixel" (requisito del cliente).
 * - Emite PageView en cambios de ruta (SPA) para evitar duplicados en la carga inicial.
 * - Inserta el bloque noscript en <body>.
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Component: MetaPixel
 * Gestiona la inyección del script base y el tracking de PageView por ruta.
 */
export default function MetaPixel(): JSX.Element | null {
  const location = useLocation()

  // Inyección única del loader + init + ViewContent
  useEffect(() => {
    const SCRIPT_ID = 'meta-pixel-base'
    if (document.getElementById(SCRIPT_ID)) return

    // Script base con init y evento "ViewContent" junto al píxel (sin PageView aquí para evitar duplicado)
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.type = 'text/javascript'
    script.innerHTML = `/* Meta Pixel Code (auto-inserted) */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1077386280774473');

/* Evento adicional solicitado (junto al pixel) */
fbq('track', 'ViewContent', {
  content_ids: ['123'],
  content_type: 'product',
});
/* End Meta Pixel Code */
`
    document.head.appendChild(script)

    // Bloque noscript en BODY (válido por especificación HTML)
    if (!document.getElementById('meta-pixel-noscript')) {
      const noScript = document.createElement('noscript')
      noScript.id = 'meta-pixel-noscript'
      noScript.innerHTML =
        '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1077386280774473&ev=PageView&noscript=1" />'
      if (document.body) {
        document.body.appendChild(noScript)
      } else {
        document.head.appendChild(noScript) // Fallback mínimo si body no está disponible aún
      }
    }
  }, [])

  // Disparar PageView en cada ruta (incluye carga inicial) para evitar doble conteo
  useEffect(() => {
    const fbqAny = (window as any)?.fbq
    if (typeof fbqAny === 'function') {
      fbqAny('track', 'PageView')
    }
  }, [location.pathname])

  return null
}
