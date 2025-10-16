/**
 * FAQ.tsx
 * Frequently asked questions using native details/summary.
 */
import React from 'react'
import Section from '../common/Section'

/**
 * FAQ entry descriptor.
 */
interface QA {
  q: string
  a: string
}

/**
 * FAQ section with accessible collapsible items.
 */
export default function FAQ() {
  const data: QA[] = [
    {
      q: '¿Puedo integrar el agente de IA con mi sitio web o WhatsApp?',
      a: 'Sí, puedes integrarlo con las principales plataformas como sitios web, WhatsApp y Messenger. Nuestro plan Premium también incluye integración con sistemas CRM y herramientas de email marketing.',
    },
    {
      q: '¿Necesito conocimientos técnicos para usar el chatbot o agente?',
      a: 'No. Entregamos todo completamente configurado, con documentación clara y soporte, para que puedas usarlo fácilmente sin experiencia técnica.',
    },
    {
      q: '¿Se puede personalizar el chatbot o agente para mi industria?',
      a: 'Por supuesto. Cada solución se adapta a tu tipo de negocio —turismo, salud, bienes raíces, energía, educación y muchos más— para ofrecer una experiencia totalmente personalizada.',
    },
    {
      q: '¿Ofrecen soporte o mantenimiento continuo?',
      a: 'Sí. El mantenimiento mensual está incluido en todos nuestros planes, con actualizaciones y soporte técnico continuo para garantizar el óptimo funcionamiento.',
    },
    {
      q: '¿Cuánto tarda la implementación?',
      a: 'Un piloto funcional suele estar listo entre 2 y 4 semanas, dependiendo de integraciones y disponibilidad de datos.',
    },
    {
      q: '¿Cómo se entrena el agente con mis datos?',
      a: 'Conectamos documentos, bases y APIs de forma segura. Definimos permisos y controles de acceso por rol para proteger tu información.',
    },
  ]
  return (
    <Section
      id="faq"
      title="Preguntas frecuentes"
      subtitle="Resolvemos dudas comunes sobre agentes de IA en producción."
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {data.map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-slate-800 bg-slate-900/50 p-4"
          >
            <summary className="cursor-pointer list-none text-white">
              <span className="select-none">{item.q}</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
