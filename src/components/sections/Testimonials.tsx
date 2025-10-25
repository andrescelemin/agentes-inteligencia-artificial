/**
 * Testimonials.tsx
 * Social proof with client quotes and avatars.
 */
import React from 'react'
import Section from '../common/Section'
import Card from '../common/Card'

/**
 * Testimonial descriptor.
 */
interface Testimonial {
  quote: string
  name: string
  role: string
  img: string
}

/**
 * Testimonials section with three quotes.
 */
export default function Testimonials() {
  const items: Testimonial[] = [
    {
      quote:
        'Nuestro agente de ventas duplicó la tasa de calificación en dos semanas. Integración impecable con el CRM.',
      name: 'María López',
      role: 'Head of Growth, Fintech',
      img: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/2caa03df-cd8e-4f43-aab8-5739bf030679.jpg',
    },
    {
      quote:
        'Soporte 24/7 con satisfacción por encima del 90%. El traspaso a humano funciona perfecto.',
      name: 'Carlos Pérez',
      role: 'CX Manager, Ecommerce',
      img: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/b26769e0-f331-4a94-abc5-4a3cf266313b.jpg',
    },
    {
      quote:
        'Pasamos de reportes manuales a insights conversacionales. Tomamos decisiones más rápido.',
      name: 'Ana García',
      role: 'Ops Lead, SaaS',
      img: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/c214acd5-9f19-486f-8d59-7110d04e09b2.jpg',
    },
  ]
  return (
    <Section
      id="testimonios"
      title="Testimonios"
      subtitle="Resultados reales con clientes reales."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Card key={t.name}>
            <div className="flex items-center gap-3">
              <img
                src={t.img}
                className="h-10 w-10 rounded-full object-cover"
                alt={t.name}
              />
              <div>
                <div className="text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">&quot;{t.quote}&quot;</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
