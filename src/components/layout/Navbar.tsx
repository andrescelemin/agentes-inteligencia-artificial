/**
 * Navbar.tsx
 * Sticky top navigation with brand, section links, and CTA.
 */
import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'
import { Bot, Sparkles } from 'lucide-react'

/**
 * Smoothly scroll to a given section id.
 */
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Navbar component with internal section navigation.
 */
export default function Navbar() {
  const nav = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Soluciones', id: 'features' },
    { label: 'Proceso', id: 'proceso' },
    { label: 'Testimonios', id: 'testimonios' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contacto', id: 'contacto' },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/70 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white sm:text-base">
            Agentes IA
          </span>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isContacto = item.id === 'contacto'
            if (isContacto) {
              return (
                <a
                  key={item.id}
                  href="https://wa.me/message/S5U7YAHYUKOBN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-slate-300 transition-colors hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  {item.label}
                </a>
              )
            }
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://wsworkflow-n8n.vn0m5y.easypanel.host/form/4becdfc3-696c-4f03-a3ac-45147055b0f5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-md bg-slate-800 px-3 text-sm text-white border border-slate-700 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Agenda Una Demo
          </a>
        </div>
      </Container>
    </header>
  )
}
