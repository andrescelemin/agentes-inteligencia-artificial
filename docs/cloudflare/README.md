# Cloudflare Worker Relay (n8n)
Proxy serverless para recibir el formulario en el navegador y reenviar con CORS correcto a n8n.

## 1) Crear el Worker
- Cloudflare Dashboard → Workers & Pages → Create Application → Worker.
- Elige "Create Worker" (no necesitas repositorio).
- Copia el contenido de `docs/cloudflare/worker.ts` en el editor (puedes usar TypeScript/JavaScript).

## 2) Variables de entorno
En el Worker → Settings → Variables:
- N8N_URL: https://wsworkflow-n8n.vn0m5y.easypanel.host/webhook/formulario-contacto
- ALLOWED_ORIGINS (opcional, recomendado en producción): 
  - Por ejemplo: https://tu-dominio.com,https://www.tu-dominio.com

Tip: Para pruebas rápidas, si no defines ALLOWED_ORIGINS, el Worker responderá con `*` (abre CORS a cualquier origen). Restringe antes de ir a producción.

## 3) Rutas
- Puedes usar la URL workers.dev (por ejemplo, https://tu-subdominio.workers.dev/relay),
  o asignar una Route bajo tu dominio: 
  - Example: Route: `tu-dominio.com/relay` → Worker: (este Worker)

## 4) Probar
- En Postman/Insomnia o desde tu sitio, POST JSON a:
  - https://tu-subdominio.workers.dev/relay (o tu ruta en dominio)
- Debe responder 200 { ok: true } si n8n devuelve éxito.

## 5) Conectar el frontend
En `src/components/sections/Contact.tsx`:
- Reemplaza la constante RELAY_URL con tu URL real del Worker, por ejemplo:
  - https://tu-subdominio.workers.dev/relay
- Opcionalmente, define una variable de entorno `VITE_RELAY_URL` en tu build si usas un sistema que inyecte envs.

## 6) Seguridad y buenas prácticas
- No coloques claves privadas en el cliente. El Worker no necesita una clave del cliente.
- Si deseas validación anti-spam adicional, puedes:
  - Integrar Cloudflare Turnstile en el formulario y validarlo en el Worker.
  - Usar reglas de Firewall de Cloudflare (rate limiting, WAF).
- Limita ALLOWED_ORIGINS a tus dominios en producción.

## 7) Diagnóstico
- Abre la pestaña "Logs" del Worker en Cloudflare para ver errores de ejecución.
- Si la respuesta incluye `status` diferente a 200, revisa los logs del Worker y de n8n.
