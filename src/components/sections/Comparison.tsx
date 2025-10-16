/**
 * Comparison.tsx
 * Tabla comparativa que destaca ventajas competitivas frente a soluciones tradicionales
 */

import React from 'react';
import { Check, X } from 'lucide-react';

interface ComparisonFeature {
  feature: string;
  nosotros: boolean;
  competencia: boolean;
}

export default function Comparison(): JSX.Element {
  const features: ComparisonFeature[] = [
    { feature: "Entrenamiento en tus datos", nosotros: true, competencia: false },
    { feature: "Soporte 24/7 automático", nosotros: true, competencia: false },
    { feature: "Integración con tus herramientas", nosotros: true, competencia: false },
    { feature: "Actualizaciones continuas", nosotros: true, competencia: false },
    { feature: "Soporte humano dedicado", nosotros: true, competencia: false },
    { feature: "Personalización completa", nosotros: true, competencia: false },
    { feature: "Implementación en 72h", nosotros: true, competencia: false },
    { feature: "Sin límite de consultas", nosotros: true, competencia: false }
  ];

  return (
    <section id="comparacion" className="py-20 bg-slate-950">
      <div className="mx-auto max-w-4xl px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="mt-3 text-slate-300">
            Compara y descubre la diferencia de trabajar con especialistas en IA
          </p>
        </header>

        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-700 bg-slate-800">
            <div className="font-semibold text-slate-300">Característica</div>
            <div className="font-semibold text-emerald-400 text-center">Nuestra Solución</div>
            <div className="font-semibold text-slate-400 text-center">Otras Soluciones</div>
          </div>
          
          {features.map((item, index) => (
            <div key={index} className={`grid grid-cols-3 gap-4 p-6 ${index % 2 === 0 ? 'bg-slate-800/50' : ''}`}>
              <div className="text-slate-300">{item.feature}</div>
              <div className="flex justify-center">
                {item.nosotros ? (
                  <Check className="h-6 w-6 text-emerald-400" />
                ) : (
                  <X className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div className="flex justify-center">
                {item.competencia ? (
                  <Check className="h-6 w-6 text-emerald-400" />
                ) : (
                  <X className="h-6 w-6 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            * Basado en análisis de mercado de soluciones de IA genéricas vs. nuestra aproximación personalizada
          </p>
        </div>
      </div>
    </section>
  );
}
