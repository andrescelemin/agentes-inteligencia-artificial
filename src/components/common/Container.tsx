/**
 * Container.tsx
 * Wrapper to center content with responsive horizontal padding and max width.
 */
import React from 'react'

/**
 * Container component to constrain content width.
 */
export default function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
