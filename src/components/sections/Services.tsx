/**
 * Services.tsx
 * Services section focused on specific business niches with clear benefits.
 */
import React from 'react'
import Section from '../common/Section'
import Card from '../common/Card'
import { Bed, Utensils, Stethoscope, Sparkles, Check } from 'lucide-react'

/**
 * Service item description interface.
 */
interface Service {
  title: string
  icon: React.ReactNode
  description: string
  bullets: string[]
}

/**
 * Services section with four specific business niches.
 */
export default function Services() {
  const services: Service[] = [
    {
      title: 'Lodges y Hostales',
      icon: <Bed className="h-5 w-5 text-violet-400" />,
      description: 'Atiende a tus huéspedes día y noche con un agente de IA que responde, agenda y guía.',
      bullets: [
        'Más reservas, menos trabajo manual',
        'Atención 24/7 en varios idiomas',
        'Guía personalizada para huéspedes',
        'Respuestas instantáneas a consultas',
      ],
    },
    {
      title: 'Restaurantes',
      icon: <Utensils className="h-5 w-5 text-violet-400" />,
      description: 'Optimiza tus reservas, pedidos y atención al cliente con un agente de IA que responde en segundos.',
      bullets: [
        'Convierte cada mensaje en una mesa ocupada',
        'Reservas automáticas sin intervención',
        'Menos llamadas perdidas',
        'Atención multicanal (WhatsApp, web, teléfono)',
      ],
    },
    {
      title: 'Consultorios y Clínicas',
      icon: <Stethoscope className="h-5 w-5 text-violet-400" />,
      description: 'Automatiza todos tus agendamientos, recordatorios y brinda una atención personalizada a tus pacientes.',
      bullets: [
        'Menos llamadas, más pacientes satisfechos',
        'Recordatorios automáticos de citas',
        'Agendamiento 24/7 sin límites horarios',
        'Información médica básica automatizada',
      ],
    },
    {
      title: 'Spas y Centros de Belleza',
      icon: <Sparkles className="h-5 w-5 text-violet-400" />,
      description: 'Tu asistente virtual agenda citas, responde consultas y enamora a tus clientes las 24 horas.',
      bullets: [
        'Relájate, tu negocio sigue trabajando por ti',
        'Citas automáticas sin confusiones',
        'Consulta de servicios y disponibilidad',
        'Recordatorios personalizados',
      ],
    },
  ]

  return (
    <Section
      id="servicios"
      title="Servicios de agentes de IA"
      subtitle="Soluciones listas para producción, entrenadas con tu conocimiento e integradas a tus herramientas."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="h-full transition hover:translate-y-[-2px] hover:border-violet-700/50">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
