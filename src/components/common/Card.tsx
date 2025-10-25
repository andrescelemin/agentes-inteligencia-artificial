/**
 * Card.tsx
 * Simple card container with border and background for dark UI.
 */
import React from 'react'
import { cn } from '../../lib/cn'

/**
 * Card wrapper for grouping content.
 */
export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
