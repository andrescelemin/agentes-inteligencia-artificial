/**
 * Button.tsx
 * Accessible button with simple variant system.
 */
import React from 'react'
import { cn } from '../../lib/cn'

/**
 * Build button class names per variant and size.
 */
function baseClasses(variant: Variant, size: Size) {
  const v =
    variant === 'primary'
      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]'
      : variant === 'secondary'
      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
      : 'bg-transparent hover:bg-white/5 text-slate-200 border border-transparent'
  const s =
    size === 'lg'
      ? 'h-12 px-6 text-base'
      : size === 'sm'
      ? 'h-9 px-3 text-sm'
      : 'h-10 px-4 text-sm'
  return cn(
    'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-slate-950',
    v,
    s
  )
}

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

/**
 * Button component; renders button or anchor when href provided.
 */
export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  ariaLabel,
  target = '_self',
}: {
  children: React.ReactNode
  className?: string
  variant?: Variant
  size?: Size
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  target?: string
}) {
  const cls = cn(baseClasses(variant, size), className)
  
  if (href) {
    return (
      <a 
        href={href} 
        className={cls} 
        aria-label={ariaLabel} 
        onClick={onClick as any}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }
  
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

/**
 * Minimal className utility to merge strings.
 */
