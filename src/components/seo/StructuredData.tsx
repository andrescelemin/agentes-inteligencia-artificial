/**
 * StructuredData.tsx
 * Componente para agregar schema markup JSON-LD para mejorar el SEO
 * y aparecer en resultados enriquecidos de Google.
 */

import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
