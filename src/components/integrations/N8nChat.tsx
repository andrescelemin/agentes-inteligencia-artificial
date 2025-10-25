/**
 * N8nChat.tsx
 * Componente para inicializar y gestionar el widget de chat de n8n
 * Se asegura de que el chat se inicialice correctamente después de que React monte el componente
 */

import { useEffect } from 'react';

declare global {
  interface Window {
    n8nChat: any;
  }
}

/**
 * Componente N8nChat
 * Inicializa el widget de chat de n8n y maneja posibles errores
 */
export default function N8nChat(): null {
  useEffect(() => {
    const initializeChat = () => {
      try {
        // Verificar que el contenedor exista
        const container = document.getElementById('n8n-chat-container');
        if (!container) {
          console.error('❌ Contenedor n8n-chat-container no encontrado');
          return;
        }

        // Verificar que n8nChat esté disponible
        if (typeof window.n8nChat === 'undefined') {
          console.error('❌ n8nChat no está disponible en window');
          return;
        }

        // Inicializar el chat
        window.n8nChat.createChat({
          webhookUrl: 'https://wsworkflow-n8n.vn0m5y.easypanel.host/webhook/5643dc77-ef2a-45c6-bbf6-0eb6de813f6e/chat',
          chatTitle: 'Asistente IA – Smart Prompt',
          defaultMessage: '¡Hola! 👋 ¿En qué puedo ayudarte hoy?',
          theme: { primaryColor: '#047857' },
          container: '#n8n-chat-container'
        });

        console.log('✅ n8n Chat inicializado desde React');
      } catch (error) {
        console.error('❌ Error al inicializar n8n Chat desde React:', error);
        
        // Reintentar después de 2 segundos
        setTimeout(() => {
          console.log('🔄 Reintentando inicialización de n8n Chat...');
          initializeChat();
        }, 2000);
      }
    };

    // Esperar a que React monte el DOM y luego inicializar
    const timer = setTimeout(initializeChat, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}