/**
 * Hero.tsx
 * Main hero with headline, subtext, CTAs, and illustrative image.
 */
import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'
import { ArrowRight, ShieldCheck } from 'lucide-react'

/**
 * Scroll helper for CTA buttons.
 */
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Hero section for first impression.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[radial-gradient(60%_60%_at_20%_10%,rgba(139,92,246,0.25),transparent),radial-gradient(30%_30%_at_80%_0%,rgba(217,70,239,0.2),transparent)]"
    >
      <Container className="relative z-10 grid items-center gap-10 py-16 sm:py-20 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
            <div className="h-2 w-2 rounded-full bg-violet-400" />
            Novedad: agentes 24/7 con entrenamiento en tus datos
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Agentes de Inteligencia Artificial para escalar tu negocio
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Automatiza ventas, soporte y operaciones con agentes autónomos,
            entrenados con tu conocimiento y conectados a tus herramientas.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/message/S5U7YAHYUKOBN1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-violet-600 px-6 text-base text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-colors hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label="Agendar una demo por WhatsApp"
            >
              Agenda una demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo('servicios')}
              ariaLabel="Ver servicios"
            >
              Ver servicios
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Privacidad y seguridad de nivel empresarial</span>
          </div>

        </div>
        <div className="relative">
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-800">
            <img
              src="https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/b6e30baf-8460-4c5d-b78f-09857cc4c72d.png"
              className="h-[320px] w-full object-cover sm:h-[420px]"
              alt="Panel de IA para reservas: agente conversacional asistiendo a un negocio"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
