/**
 * Process.tsx
 * Visual timeline of project steps from discovery to launch.
 */
import React from 'react'
import Section from '../common/Section'
import Card from '../common/Card'
import { Search, PencilRuler, Brain, Rocket } from 'lucide-react'

/**
 * Process stage descriptor.
 */
interface Stage {
  step: number
  title: string
  desc: string
  icon: React.ReactNode
}

/**
 * Process section with 4 steps.
 */
export default function Process() {
  const stages: Stage[] = [
    {
      step: 1,
      title: 'Descubrimiento',
      desc: 'Entendemos objetivos, canales y fuentes de datos.',
      icon: <Search className="h-5 w-5 text-violet-400" />,
    },
    {
      step: 2,
      title: 'Diseño',
      desc: 'Definimos flujos, herramientas y métricas de éxito.',
      icon: <PencilRuler className="h-5 w-5 text-violet-400" />,
    },
    {
      step: 3,
      title: 'Entrenamiento',
      desc: 'Conectamos tus datos y probamos iterativamente.',
      icon: <Brain className="h-5 w-5 text-violet-400" />,
    },
    {
      step: 4,
      title: 'Lanzamiento',
      desc: 'Salida a producción y optimización continua.',
      icon: <Rocket className="h-5 w-5 text-violet-400" />,
    },
  ]
  return (
    <Section
      id="proceso"
      title="Proceso"
      subtitle="Alineados a tus objetivos, con entregas claras y tiempos cortos."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <Card key={s.step}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  {s.icon}
                </div>
                <h3 className="text-white">{s.title}</h3>
              </div>
              <div className="text-2xl font-bold text-violet-400">0{s.step}</div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{s.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
