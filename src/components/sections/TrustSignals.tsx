/**
 * TrustSignals.tsx
 * Muestra elementos de confianza: certificaciones, seguridad, y garantías
 */

import React from 'react';
import { Shield, Lock, Award, Clock } from 'lucide-react';

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function TrustSignals(): JSX.Element {
  const trustItems: TrustItem[] = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-400" />,
      title: "Seguridad Enterprise",
      description: "Tus datos protegidos con encriptación de nivel bancario"
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-400" />,
      title: "Privacidad Garantizada",
      description: "Cumplimiento GDPR y regulaciones de protección de datos"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      title: "Certificados de Calidad",
      description: "Soluciones validadas por expertos en IA empresarial"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-400" />,
      title: "Implementación Rápida",
      description: "Tu agente IA funcionando en menos de 72 horas"
    }
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
