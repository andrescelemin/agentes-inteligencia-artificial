/**
 * Section.tsx
 * Generic vertical section with optional heading and description.
 */
import React from 'react'
import Container from './Container'

/**
 * Section wrapper with title/subtitle and spacing.
 */
export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  headerAlign = 'center',
}: {
  id?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  headerAlign?: 'left' | 'center'
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <div
            className={`mb-10 sm:mb-14 ${
              headerAlign === 'center' ? 'text-center' : 'text-left'
            }`}
          >
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:mx-auto sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}
