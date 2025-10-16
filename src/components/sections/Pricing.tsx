/**
 * Pricing.tsx
 * Sección de planes y precios en tema oscuro coherente con el sitio.
 * Presenta tres planes en un grid responsivo con CTA y texto informativo por tarjeta.
 */
import React from 'react'
import Section from '../common/Section'
import { Star, Users, Building } from 'lucide-react'
import PlanCard from './pricing/PlanCard'

/**
 * Interface para definir la estructura de cada plan
 */
interface PricingPlan {
  /** Título del plan */
  title: string
  /** Subtítulo o público objetivo */
  subtitle: string
  /** Descripción corta del beneficio */
  description: string
  /** Icono decorativo del plan */
  icon: React.ReactNode
}

/**
 * Componente principal de la sección de precios
 * Uso de tema oscuro, alto contraste, y layout responsivo.
 */
export default function Pricing() {
  const plans: PricingPlan[] = [
    {
      title: 'Plan Start – Emprendedores',
      subtitle: 'Ideal para: emprendedores o profesionales independientes',
      description:
        'Si estás comenzando o trabajas de forma independiente, este plan te ofrece un agente de IA básico personalizado para acelerar tus tareas.',
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: 'Plan Pro – Negocios',
      subtitle: 'Para negocios o pequeños equipos que buscan automatizar más procesos',
      description:
        'Pensado para equipos en crecimiento: más integraciones, soporte prioritario y capacidades avanzadas para automatizar tu operación.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Plan Business – Empresas',
      subtitle: 'Para empresas, agencias o desarrolladores que desean crear agentes de IA',
      description:
        'La opción más completa: múltiples agentes, integraciones ilimitadas y soporte dedicado 24/7 para escalar con seguridad y control.',
      icon: <Building className="h-6 w-6" />,
    },
  ]

  const upworkUrl =
    'https://www.upwork.com/services/product/development-it-your-custom-ai-agent-in-just-48-hours-1960380554091163349?ref=project_share&tier=1'

  return (
    <Section
      id="planes"
      title="Planes y Precios"
      subtitle="Elige el plan perfecto para tu negocio. Implementación en 48 horas."
      className="bg-transparent py-16 md:py-24"
    >
      {/* Grid de planes: 1 col en móvil, 2 en tablet, 3 en desktop */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.title}
            title={plan.title}
            subtitle={plan.subtitle}
            description={plan.description}
            icon={<span className="text-violet-400">{plan.icon}</span>}
            ctaHref={upworkUrl}
            ctaAriaLabel={`Adquirir ${plan.title} en Upwork`}
          />
        ))}
      </div>
    </Section>
  )
}
