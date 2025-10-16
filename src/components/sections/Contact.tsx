/**
 * Contact.tsx
 * Contact section with clear CTAs: main AI agent consultation and a free demo form.
 * No form submission logic; purely navigational actions.
 */

import React from 'react'
import { Bot, MessageCircle, FormInput } from 'lucide-react'

/**
 * Contact
 * Presents three call-to-action buttons:
 * - Hacer Consulta Profesional (ChatGPT agent)
 * - WhatsApp (quick messaging)
 * - Agendar Demo Gratis (external form)
 */
export default function Contact(): JSX.Element {
  // External targets and labels
  const LINKS = {
    chatgpt: 'https://chatgpt.com/g/g-68efb9b752608191aa8f09068ae86fdf-smartprompt-ai',
    // Generic WhatsApp share endpoint without a fixed number to avoid hard-coding
    whatsapp: 'https://api.whatsapp.com/send?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20SmartPrompt%20AI',
    demoForm:
      'https://wsworkflow-n8n.vn0m5y.easypanel.host/form/4becdfc3-696c-4f03-a3ac-45147055b0f5',
  }

  return (
    <section id="contact" className="py-20 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-50">
            ¿Listo para avanzar?
          </h2>
          <p className="mt-3 text-slate-300">
            Resolvemos tus dudas y te mostramos cómo aplicar IA en tu negocio.
          </p>
        </header>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
          {/* Primary: AI Agent Consultation - Purple */}
          <a
            href={LINKS.chatgpt}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium
                       bg-purple-500 text-slate-900 hover:bg-purple-400 transition
                       focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Hacer Consulta Profesional con agente de IA"
          >
            <Bot className="h-5 w-5" aria-hidden="true" />
            <span>Hacer Consulta Profesional</span>
          </a>

          {/* Secondary: WhatsApp - Green */}
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium
                       bg-green-500 text-slate-900 hover:bg-green-400 transition
                       focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          {/* Secondary: Free demo form - Gray */}
          <a
            href={LINKS.demoForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium
                       bg-slate-800 text-slate-100 hover:bg-slate-700 transition
                       focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Agendar Demo Gratis mediante formulario"
          >
            <FormInput className="h-5 w-5" aria-hidden="true" />
            <span>Agendar Demo Gratis</span>
          </a>
        </div>

        {/* Subtext */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Respuesta típica en menos de 24 horas. Sin compromiso.
        </p>
      </div>
    </section>
  )
}