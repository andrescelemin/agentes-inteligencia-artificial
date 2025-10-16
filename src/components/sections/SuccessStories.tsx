/**
 * SuccessStories.tsx
 * Muestra casos de éxito concretos con métricas para generar confianza
 * y demostrar resultados tangibles en diferentes industrias.
 */

import React from 'react';
import { TrendingUp, Users, Clock, DollarSign, MessageCircle, Calendar } from 'lucide-react';

interface SuccessMetric {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  metrics: SuccessMetric[];
  image: string;
  industry: string;
}

export default function SuccessStories(): JSX.Element {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Restaurante Gourmet La Terraza",
      description: "Implementamos agente IA que gestiona reservas automáticas y recomendaciones de menú, optimizando la experiencia del cliente completamente.",
      industry: "Gastronomía",
      metrics: [
        { icon: <Calendar className="h-5 w-5" />, value: "150+", label: "Reservas/mes" },
        { icon: <Clock className="h-5 w-5" />, value: "24/7", label: "Disponibilidad" },
        { icon: <TrendingUp className="h-5 w-5" />, value: "45%", label: "Más eficiencia" }
      ],
      image: "https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/6571aa43-2a59-4acb-96c6-7acaed658b6a.jpg"
    },
    {
      id: 2,
      title: "Tienda Online Moda Express",
      description: "Sistema de IA que proporciona soporte personalizado y recomendaciones de productos, incrementando significativamente las conversiones.",
      industry: "E-commerce",
      metrics: [
        { icon: <DollarSign className="h-5 w-5" />, value: "38%", label: "Más ventas" },
        { icon: <MessageCircle className="h-5 w-5" />, value: "1.5min", label: "Respuesta media" },
        { icon: <Users className="h-5 w-5" />, value: "600+", label: "Clientes/día" }
      ],
      image: "https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/b1e92300-0f1b-41a0-b872-71fa07dcd232.jpg"
    },
    {
      id: 3,
      title: "Consultoría Estratégica Avanzada",
      description: "Agente inteligente que maneja consultas iniciales y programación de citas, escalando la capacidad de atención sin costos adicionales.",
      industry: "Consultoría",
      metrics: [
        { icon: <Users className="h-5 w-5" />, value: "3.2x", label: "Más capacidad" },
        { icon: <Clock className="h-5 w-5" />, value: "85%", label: "Tiempo ahorrado" },
        { icon: <TrendingUp className="h-5 w-5" />, value: "55%", label: "Más leads" }
      ],
      image: "https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68ed7bf9b6c48f161d2ff818/resource/848898e0-ff10-42bb-bca3-103625624868.jpg"
    }
  ];

  return (
    <section id="casos-exito" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resultados Reales con IA
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo empresas similares a la tuya han transformado sus operaciones 
            con soluciones de inteligencia artificial personalizadas
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div 
              key={study.id} 
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/70 transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {study.industry}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                {study.title}
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed text-base">
                {study.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
                {study.metrics.map((metric, index) => (
                  <div key={index} className="text-center group-hover:transform group-hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-center text-emerald-400 mb-2">
                      {metric.icon}
                    </div>
                    <div className="text-white font-bold text-lg mb-1">{metric.value}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            ¿Listo para transformar tu negocio? <span className="text-emerald-400 font-semibold">Solicita una demostración personalizada</span>
          </p>
        </div>
      </div>
    </section>
  );
}