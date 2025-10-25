/**
 * useMetaPixel.ts
 * Hook personalizado para manejar el Pixel de Meta en aplicaciones SPA
 * Inicializa el Pixel y rastrea PageView en cada cambio de ruta
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

/**
 * Hook para manejar el Pixel de Meta en SPAs
 * @returns {void}
 */
export function useMetaPixel(): void {
  const location = useLocation();

  useEffect(() => {
    // Inicializar el Pixel si no está cargado
    if (typeof window.fbq === 'undefined') {
      // Configurar la cola del Pixel
      window._fbq = window._fbq || [];
      window.fbq = function() {
        window._fbq.push(arguments);
      };
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];

      // Cargar el script del Pixel
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      // Inicializar con el ID correcto
      window.fbq('init', '833024165811190');
    }

    // Rastrear PageView inicial
    window.fbq('track', 'PageView');
  }, []);

  useEffect(() => {
    // Rastrear PageView en cada cambio de ruta
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }, [location]);
}
