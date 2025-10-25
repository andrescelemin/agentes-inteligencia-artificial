/**
 * Footer.tsx
 * Site footer with navigation links, social links, and copyright.
 */
import React from 'react'
import Container from '../common/Container'
import { Bot, Mail } from 'lucide-react'

/**
 * Smooth scroll helper for internal links
 */
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Footer component with navigation and contact links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const internalLinks = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Soluciones', id: 'features' },
    { label: 'Proceso', id: 'proceso' },
    { label: 'Testimonios', id: 'testimonios' },
    { label: 'FAQ', id: 'faq' }
  ]

  const externalLinks = [
    { 
      label: 'Contacto', 
      href: 'https://wa.me/message/S5U7YAHYUKOBN1',
      icon: <Mail className="h-4 w-4" />
    },
    { 
      label: 'Ver Catálogo', 
      href: 'https://drive.google.com/file/d/1HC2ejIY574TypHJRWJqZX6rp1PbJ5cLz/view?usp=sharing',
      icon: null
    }
  ]

  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-white">Agentes IA</span>
                  <p className="mt-2 max-w-md text-sm text-slate-400">
                    Soluciones de Inteligencia Artificial para automatizar y escalar tu negocio.
                  </p>
                </div>
              </div>
            </div>

            {/* Internal Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-white">Navegación</h3>
              <ul className="mt-4 space-y-2">
                {internalLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Links */}
            <div>
              <h3 className="text-sm font-semibold text-white">Recursos</h3>
              <ul className="mt-4 space-y-2">
                {externalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-slate-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-slate-400">
                © {currentYear} Agentes IA. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>Hecho con IA</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}