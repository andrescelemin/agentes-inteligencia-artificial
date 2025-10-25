/**
 * Features.tsx
 * Grid of reasons/benefits for choosing the solution.
 */
import React from 'react'
import Section from '../common/Section'
import Card from '../common/Card'
import { Shield, Zap, Database, MessagesSquare, Workflow, Clock } from 'lucide-react'

/**
 * Feature descriptor.
 */
interface Feature {
  title: string
  desc: string
  icon: React.ReactNode
}

/**
 * Features section emphasizing differentiators.
 */
export default function Features() {
  const features: Feature[] = [
    {
      title: 'Multicanal',
      desc: 'Web, WhatsApp, Email y más con contexto unificado.',
      icon: <MessagesSquare className="h-5 w-5 text-violet-400" />,
    },
    {
      title: 'Implementación rápida',
      desc: 'Semanas, no meses. De la idea al piloto en tiempo récord.',
      icon: <Zap className="h-5 w-5 text-violet-400" />,
    },
    {
      title: 'Entrenados con tus datos',
      desc: 'Conecta bases, documentos y APIs de manera segura.',
      icon: <Database className="h-5 w-5 text-violet-400" />,
    },
    {
      title: 'Seguridad y privacidad',
      desc: 'Controles de acceso, registros y cifrado en tránsito.',
      icon: <Shield className="h-5 w-5 text-violet-400" />,
    },
    {
      title: 'Orquestación',
      desc: 'Flujos, herramientas y memoria para agentes fiables.',
      icon: <Workflow className="h-5 w-5 text-violet-400" />,
    },
    {
      title: 'Disponibilidad 24/7',
      desc: 'Atención continua sin tiempos muertos.',
      icon: <Clock className="h-5 w-5 text-violet-400" />,
    },
  ]
  return (
    <Section
      id="features"
      title="¿Por qué nuestros agentes?"
      subtitle="Tecnología lista para producción con foco en confiabilidad, seguridad y resultados."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                {f.icon}
              </div>
              <h3 className="text-white">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-300">{f.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
