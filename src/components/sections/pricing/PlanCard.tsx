/**
 * PlanCard.tsx
 * Card component for a pricing plan in dark theme, ensuring high contrast and clear hierarchy.
 * Renders title, subtitle, description, CTA button, and informational text.
 */
import React from 'react'
import Card from '../../common/Card'
import Button from '../../common/Button'

/**
 * Props for PlanCard defining its content and behavior.
 */
export interface PlanCardProps {
  /** Plan main title, e.g., "Plan Start" */
  title: string
  /** Short subtitle describing audience, e.g., "Emprendedores" */
  subtitle: string
  /** Description explaining who benefits from this plan */
  description: string
  /** Optional decorative icon element shown above title */
  icon?: React.ReactNode
  /** CTA URL to purchase on Upwork */
  ctaHref: string
  /** Optional custom aria label for CTA */
  ctaAriaLabel?: string
  /** Additional className for the root card */
  className?: string
}

/**
 * PlanCard
 * Presents one plan option with clear hierarchy and strong contrast for dark UI.
 */
export default function PlanCard({
  title,
  subtitle,
  description,
  icon,
  ctaHref,
  ctaAriaLabel,
  className = '',
}: PlanCardProps) {
  return (
    <Card className={`h-full flex flex-col gap-5 hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-500/30 transition-all ${className}`}>
      {/* Icon area (optional) */}
      {icon ? (
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/30 text-violet-400">
            {icon}
          </div>
        </div>
      ) : null}

      {/* Heading */}
      <div className="text-center space-y-1">
        <h3 className="text-xl md:text-2xl font-bold text-slate-50">{title}</h3>
        <p className="text-base font-semibold text-violet-300/90">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed text-slate-300 text-center">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-auto space-y-3">
        <Button
          href={ctaHref}
          target="_blank"
          ariaLabel={ctaAriaLabel ?? `Adquirir ${title} en Upwork`}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3"
        >
          Adquirir en Upwork
        </Button>

        {/* Informational text required under/next to the CTA */}
        <p className="text-xs text-slate-400 leading-relaxed text-center">
          Contrata y paga solo cuando estés satisfecho, por medio de la plataforma Upwork,
          reconocida para contratación de servicios profesionales.
        </p>
      </div>
    </Card>
  )
}
