# CORS Proxy para n8n (Cloudflare Worker)
# Propósito
Permitir que el widget web llame a webhooks de n8n desde el navegador cuando el servidor n8n no expone CORS.

# Despliegue rápido (sin wrangler)
1) Cloudflare Dashboard → Workers → Create → Quick edit.
2) Pega el contenido de worker.ts.
3) En Settings → Variables:
   - ALLOWED_ORIGINS: https://sider.ai,https://*.sider.ai (o tu dominio)
   - ALLOWED_HOSTS: wsworkflow-n8n.vn0m5y.easypanel.host (o el host de tu n8n)
4) Deploy.

# Usar el proxy en la web
En consola o en tu HTML antes de cargar la app:
  window.__N8N_PROXY_URL__ = 'https://tu-worker.workers.dev';

El widget N8nChat intentará directo; si ve CORS/Failed to fetch, reintenta por el proxy automáticamente y mostrará “Conectado (proxy)”.

# Recomendado (solución definitiva): habilitar CORS en n8n
En tu instancia de n8n (variables de entorno):
- N8N_CORS_ENABLED=true
- N8N_CORS_ORIGIN=https://sider.ai,https://*.sider.ai (o tu dominio)
- N8N_CORS_ALLOW_HEADERS=Content-Type,Authorization
- N8N_CORS_ALLOW_METHODS=GET,POST,OPTIONS

Si el workflow está “Active”, usa /webhook/…; si no, /webhook-test/…